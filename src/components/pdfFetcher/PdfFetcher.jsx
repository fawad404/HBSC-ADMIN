import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfFetcher = () => {
  const [transactions, setTransactions] = useState({});

  const normalizeText = (text) => {
    return text
      .replace(/\s+/g, ' ')  // normalize multiple spaces
      .replace(/(\d),(\d)/g, '$1$2')  // remove commas in numbers
      .trim();
  };

  const parseAmount = (amountStr) => {
    // Remove any currency symbols and spaces
    const cleanAmount = amountStr.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanAmount);
  };

  const extractTransactions = async (pdfText) => {
    // Normalize the text first
    const normalizedText = normalizeText(pdfText);
    
    // More precise regex pattern
    const regex = /([A-Za-z]+\s+\d{1,2},\s*\d{4})\s*([A-Z0-9\*\-\s\.]+?)\s+([-+]?\d*[,.]?\d+\.?\d*)\s*(USD|GBP|PKR)/gi;
    const matches = Array.from(normalizedText.matchAll(regex));

    const transactionsData = {
      metadata: {
        totalTransactions: 0,
        totalCredit: 0,
        totalDebit: 0,
        currencies: new Set(),
        processingDate: new Date().toISOString()
      },
      transactions: {}
    };

    matches.forEach((match, index) => {
      const rawAmount = match[3];
      const amount = parseAmount(rawAmount);
      const date = match[1].trim();
      const description = match[2].trim();
      const currency = match[4].toUpperCase();

      // Skip invalid amounts
      if (isNaN(amount)) {
        console.warn(`Skipped invalid amount: ${rawAmount} for transaction: ${description}`);
        return;
      }

      const transactionId = `TXN_${date.replace(/[^0-9]/g, '')}_${index}`;

      // Update metadata
      transactionsData.metadata.totalTransactions++;
      transactionsData.metadata.currencies.add(currency);
      
      if (amount >= 0) {
        transactionsData.metadata.totalCredit += amount;
      } else {
        transactionsData.metadata.totalDebit += Math.abs(amount);
      }

      // Store transaction with additional validation
      transactionsData.transactions[transactionId] = {
        date: date,
        description: description,
        amount: Number(amount.toFixed(2)), // Ensure 2 decimal places
        type: amount >= 0 ? 'credit' : 'debit',
        currency: currency,
        rawText: match[0].trim(),
        processingDetails: {
          originalAmount: rawAmount,
          normalizedAmount: amount,
          isRounded: Math.abs(amount % 1) < 0.01
        }
      };
    });

    // Convert Set to Array and sort currencies
    transactionsData.metadata.currencies = Array.from(transactionsData.metadata.currencies).sort();
    
    // Add summary calculations
    transactionsData.metadata.totalCredit = Number(transactionsData.metadata.totalCredit.toFixed(2));
    transactionsData.metadata.totalDebit = Number(transactionsData.metadata.totalDebit.toFixed(2));
    transactionsData.metadata.netBalance = Number((transactionsData.metadata.totalCredit - transactionsData.metadata.totalDebit).toFixed(2));

    setTransactions(transactionsData);
    console.log('Parsed Transactions:', transactionsData);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await getDocument(typedArray).promise;

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          textContent.items.forEach((item) => (fullText += item.str + ' '));
        }

        await extractTransactions(fullText);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
   <>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      {/* <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Summary:</h3>
        {transactions.metadata && (
          <div className="mb-4">
            <p>Total Transactions: {transactions.metadata.totalTransactions}</p>
            <p>Total Credit: {transactions.metadata.totalCredit}</p>
            <p>Total Debit: {transactions.metadata.totalDebit}</p>
            <p>Net Balance: {transactions.metadata.netBalance}</p>
            <p>Currencies: {transactions.metadata.currencies.join(', ')}</p>
          </div>
        )}
        <pre className="mt-4 overflow-auto">{JSON.stringify(transactions, null, 2)}</pre>
      </div> */}
    </>
  );
};

export default PdfFetcher;
