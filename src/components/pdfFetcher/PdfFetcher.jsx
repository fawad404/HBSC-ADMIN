import React, { useState, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { FileUp, File, Check, X } from 'lucide-react';
import 'pdfjs-dist/build/pdf.worker.min';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfFetcher = () => {
  const [transactions, setTransactions] = useState({});
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null
  const fileInputRef = useRef(null);

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
      setFileName(file.name);
      setIsUploading(true);
      setUploadStatus(null);
      
      try {
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
          setUploadStatus('success');
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('Error processing PDF:', error);
        setUploadStatus('error');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <div 
        onClick={() => fileInputRef.current.click()}
        className={`
          w-full p-4 border-2 border-dashed rounded-xl
          flex items-center justify-center gap-3 cursor-pointer
          transition-all duration-300
          ${uploadStatus === 'success' 
            ? 'border-green-500 bg-green-50' 
            : uploadStatus === 'error'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
          }
        `}
      >
        {uploadStatus === 'success' ? (
          <>
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-green-600">File uploaded successfully</span>
          </>
        ) : uploadStatus === 'error' ? (
          <>
            <X className="h-5 w-5 text-red-500" />
            <span className="text-red-600">Error uploading file</span>
          </>
        ) : fileName ? (
          <>
            <File className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">{fileName}</span>
          </>
        ) : (
          <>
            <FileUp className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Click to upload PDF file</span>
          </>
        )}
      </div>
      
      {isUploading && (
        <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfFetcher;

