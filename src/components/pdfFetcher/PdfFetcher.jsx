import React, { useState, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min';
import { v4 as uuidv4 } from 'uuid';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfFetcher = ({ onTransactionsUpdate }) => {
  const [transactions, setTransactions] = useState({});
  const staticTransactionDate = "Oct 30, 2024"; // Define your static transaction ID here
  const staticDescription = "ICON OFFICES LTD";
  const staticAmount = "-12.87";

  const normalizeText = (text) => {
    return text
      .replace(/\s+/g, ' ')  // normalize multiple spaces
      .replace(/(\d),(\d)/g, '$1$2')  // remove commas in numbers
      .trim();
  };

  const parseAmount = (amountStr) => {
    const cleanAmount = amountStr.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanAmount);
  };

  const extractTransactions = async (pdfText) => {
    const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
  
    const normalizedText = normalizeText(pdfText);
    const regex = /([A-Za-z]+\s+\d{1,2},\s*\d{4})\s*([A-Z0-9\*\-\s\.]+?)\s+([-+]?\d*[,.]?\d+\.?\d*)\s*(USD|GBP|PKR)/gi;
    const matches = Array.from(normalizedText.matchAll(regex));
  
    const transactionsData = {
      metadata: {
        totalTransactions: 0,
        totalCredit: 0,
        totalDebit: 0,
        currencies: new Set(),
        processingDate: new Date().toISOString(),
      },
      transactions: {},
    };

    // Sort matches by date in descending order (newest first)
    const sortedMatches = matches.sort((a, b) => {
      const dateA = new Date(a[1]);
      const dateB = new Date(b[1]);
      return dateB - dateA;
    });
  
    for (let index = 0; index < sortedMatches.length; index++) {
      const match = sortedMatches[index];
      const rawAmount = match[3];
      const amount = parseFloat(rawAmount.replace(/[^0-9.-]/g, ''));
      const date = match[1].trim(); 
      const description = match[2].trim();
      const currency = match[4].toUpperCase();

      console.log('Processing Chunk:', { date, description, amount, currency });
  
      if (isNaN(amount)) continue;

      // Check for matching transaction BEFORE adding it
      if (staticTransactionDate && staticDescription && staticAmount) {
        const isMatch = date === staticTransactionDate && 
                       description.includes(staticDescription) && 
                       amount === parseFloat(staticAmount);
        
        if (isMatch) {
          console.log("Found matching transaction - stopping here:", { date, description, amount, currency });
          break; // Stop processing WITHOUT adding the matching transaction
        }
      }

      // Only add the transaction if it's not the matching one
      const transactionId = `TXN_${date.replace(/[^A-Za-z0-9]/g, '')}_${index}`;
      
      transactionsData.metadata.totalTransactions++;
      transactionsData.metadata.currencies.add(currency);
      if (amount >= 0) transactionsData.metadata.totalCredit += amount;
      else transactionsData.metadata.totalDebit += Math.abs(amount);
  
      transactionsData.transactions[transactionId] = {
        date,
        description,
        amount: Number(amount.toFixed(2)),
        type: amount >= 0 ? 'credit' : 'debit',
        currency,
        rawText: match[0].trim(),
      };
    }

    // Update metadata
    transactionsData.metadata.currencies = Array.from(transactionsData.metadata.currencies).sort();
    transactionsData.metadata.totalCredit = Number(transactionsData.metadata.totalCredit.toFixed(2));
    transactionsData.metadata.totalDebit = Number(transactionsData.metadata.totalDebit.toFixed(2));
    transactionsData.metadata.netBalance = Number((transactionsData.metadata.totalCredit - transactionsData.metadata.totalDebit).toFixed(2));
  
    setTransactions(transactionsData);
    if (onTransactionsUpdate) {
      onTransactionsUpdate(transactionsData.transactions);
    }
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

  useEffect(() => {
    console.log('Updated Transactions:', transactions);
  }, [transactions]);

  return (
    <>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <div className="bg-gray-100 p-4 rounded overflow-auto h-full">
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
      </div>
    </>
  );
};

export default PdfFetcher;
