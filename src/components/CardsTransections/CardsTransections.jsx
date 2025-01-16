import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parse, isWithinInterval } from 'date-fns'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/pdf-logo.svg'
import autoTable from 'jspdf-autotable'

const transactionsByCard = {
  1: [
    { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Shopify', Reference: ' 628037', amount: 310.50, levy: 33.17 },
    { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Shopify', Reference: ' 057371', amount: 439.00, levy: 46.87 },
    { transferDate: '23 June 2024', postingDate: '24 June 2024', description: 'Shopify', Reference: ' 129668', amount: 521.75, levy: 55.75 },
    { transferDate: '23 June 2024', postingDate: '24 June 2024', description: 'Shopify', Reference: ' 975608', amount: 220.00, levy: 23.54 },
    { transferDate: '22 June 2024', postingDate: '23 June 2024', description: 'Shopify', Reference: ' 217381', amount: 391.50, levy: 41.89 },
    { transferDate: '22 June 2024', postingDate: '23 June 2024', description: 'Shopify', Reference: ' 231663', amount: 370.25, levy: 39.59 },
    { transferDate: '21 June 2024', postingDate: '22 June 2024', description: 'Shopify', Reference: ' 171836', amount: 816.00, levy: 87.31 },
    { transferDate: '21 June 2024', postingDate: '22 June 2024', description: 'Shopify', Reference: ' 778001', amount: 184.50, levy: 19.69 },
    { transferDate: '20 June 2024', postingDate: '21 June 2024', description: 'Shopify', Reference: ' 445291', amount: 629.99, levy: 67.41 },
    { transferDate: '20 June 2024', postingDate: '21 June 2024', description: 'Shopify', Reference: ' 662154', amount: 445.25, levy: 47.64 },
    { transferDate: '19 June 2024', postingDate: '20 June 2024', description: 'Shopify', Reference: ' 334789', amount: 937.50, levy: 100.31 },
    { transferDate: '19 June 2024', postingDate: '20 June 2024', description: 'Shopify', Reference: ' 112456', amount: 273.75, levy: 29.29 },
    { transferDate: '18 June 2024', postingDate: '19 June 2024', description: 'Shopify', Reference: ' 998877', amount: 556.25, levy: 59.52 },
    { transferDate: '18 June 2024', postingDate: '19 June 2024', description: 'Shopify', Reference: ' 445566', amount: 182.50, levy: 19.53 },
    { transferDate: '17 June 2024', postingDate: '18 June 2024', description: 'Shopify', Reference: ' 778899', amount: 729.99, levy: 78.11 }
  ],
  2: [
    { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Shopify', Reference: ' 334455', amount: 445.50, levy: 47.67 },
    // ...add more transactions here
  ],
  3: [
    { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Shopify', Reference: ' 112233', amount: 667.25, levy: 71.40 },
    // ...add more transactions here
  ],
};

const getAllTransactions = () => {
  return Object.values(transactionsByCard)
    .flat()
    .sort((a, b) => {
      const dateA = new Date(a.transferDate);
      const dateB = new Date(b.transferDate);
      return dateB - dateA;
    })
    .slice(0, 10);
};

export default function CardsTransactions({ cardDetails }) {
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const getRecentTransactions = () => {
    const transactions = id 
      ? transactionsByCard[id] || []
      : Object.values(transactionsByCard).flat();
    
    return transactions
      .sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate))
      .slice(0, 10);
  };

  useEffect(() => {
    setFilteredTransactions(getRecentTransactions());
  }, [id]);

  const filterTransactions = () => {
    if (!startDate || !endDate) {

      const transactions = id 
        ? (transactionsByCard[id] || []).slice(0, 10)
        : getAllTransactions();
      setFilteredTransactions(transactions);
      return;
    }

    const transactions = id 
      ? (transactionsByCard[id] || [])
      : Object.values(transactionsByCard).flat();

    const filtered = transactions.filter(transaction => {
      const date = parse(transaction.transferDate, 'd MMMM yyyy', new Date());
      return isWithinInterval(date, {
        start: parse(startDate, 'yyyy-MM-dd', new Date()),
        end: parse(endDate, 'yyyy-MM-dd', new Date())
      });
    });

    setFilteredTransactions(filtered);
  };

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalLevy = filteredTransactions.reduce((sum, transaction) => sum + transaction.levy, 0)

  const convertSvgToDataUrl = (callback) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      callback(canvas.toDataURL('image/png'))
    }
    img.src = logo
  }

  const exportToPDF = () => {
    const doc = new jsPDF();

    let start = startDate;
    let end = endDate;

    if (!startDate) {
      start = '2024-01-01';
    }

    if (!endDate) {
      end = format(new Date(), 'yyyy-MM-dd');
    }

    convertSvgToDataUrl((dataUrl) => {
      try {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const padding = 25; // Add padding to the left and right

        const logoWidth = 50;
        const logoHeight = 10;
        const totalWidth = logoWidth + doc.getTextWidth('HSBC UK Bank Limited');
        const logoX = (pageWidth - totalWidth) / 2;
        doc.addImage(dataUrl, 'PNG', logoX, 14, logoWidth, logoHeight);

        doc.setFontSize(18);
        doc.setTextColor(0,0,0);
        doc.setFont('helvetica', 'bold');
        doc.text('HSBC UK Bank ', 75, 17);
        doc.text('Limited', 75 , 25)

        // Add address under header
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('1 Centenary Square, Birmingham, B1 1HQ',75, 30);

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('DEBIT CARD TRANSECTIONS STATEMENT', pageWidth / 2, 50, { align: 'center' });

        // Add customer details with null check
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('AHMAD ASRAR ', padding, 70);
        doc.text('10A Cranley Parade, SE9 4DZ', padding, 80);

        let startY = 115; // Default startY without card details

        // Only add card details if they exist
        if (cardDetails) {
          doc.text(`Card Number: ${cardDetails.number}`, padding, 90);
          doc.text(`CVV: ${cardDetails.cvv}`, padding, 100);
          doc.text(`Expiry: ${cardDetails.expiry}`, padding, 110);
          startY = 130; // Adjust startY when card details are present
        }

        // Add export date and time on the right with UK timezone
        const ukTime = new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/London',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        });
        const ukDate = format(new Date(), 'dd/MM/yyyy');
        doc.setFontSize(9);
        doc.text(`Duration: ${start} - ${end}`, pageWidth - padding, startY - 15, { align: 'right' });
        doc.text(`Export Date: ${ukDate}`, pageWidth - padding, startY - 8, { align: 'right' });



        // Update table headers and data structure
        const tableData = filteredTransactions.map(transaction => [
          transaction.Reference,
          transaction.transferDate,
          transaction.description,
          `$${transaction.amount.toFixed(2)}`
        ]);

        // Update table with new starting position
        doc.autoTable({
          startY: startY, // Adjust start position if card details are present
          margin: { left: padding, right: padding },
          head: [['Reference Number', 'Date', 'Description', 'Transaction Amount']],
          body: tableData,
          theme: 'grid',
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: 'bold'
          },
          styles: {
            fontSize: 11,
            cellPadding: 1,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
          alternateRowStyles: {
            fillColor: [255, 255, 255],
          },
          bodyStyles: {
            textColor: [0, 0, 0],
          },
          didDrawPage: (data) => {
            const tableHeight = data.cursor.y;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(128, 128, 128);
            doc.text('HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved.', padding, tableHeight + 17);
          }
        });

        // Save the PDF
        doc.save('Wallet-Balance-Statement.pdf');
      } catch (error) {
        console.error('Error generating the PDF:', error);
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div className="p-4 lg:p-6">
        
        <div className="flex flex-col lg:flex-row lg:justify-end space-y-2 lg:space-y-0 lg:space-x-0 mb-4 mt-4">
          <input
            type="date"
            className="border rounded p-2 w-full lg:w-auto"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2 w-full lg:w-auto"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            onClick={filterTransactions}
            className="bg-[#db0011] text-white px-4 py-2  hover:bg-[#af000d] w-full lg:w-auto"
          >
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Number</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posting Date</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.Reference}</td>
                  <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.transferDate}</td>
                  <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-green-600">{transaction.description}</td>
                  <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-blue-600">${transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={2} className="px-3 lg:px-6 py-2 lg:py-4 text-right font-semibold text-sm">Total Amount (GBP)</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-blue-600 font-semibold text-sm">${totalAmount.toFixed(2)}</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-green-600 font-semibold text-sm">${totalLevy.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex flex-col p-4 lg:p-6 bg-gray-50">
        <div className="flex justify-between mb-4">
          <button 
            className="bg-[#db0011] text-white px-3 lg:px-4 py-2 hover:bg-[#af000d] text-sm"
            onClick={exportToPDF}
          >
            Export
          </button>
          <button 
            className="bg-[#db0011] text-white px-3 lg:px-4 py-2 hover:bg-[#af000d] text-sm"
            onClick={() => {
              setStartDate('')
              setEndDate('')
              setFilteredTransactions(getRecentTransactions())
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

