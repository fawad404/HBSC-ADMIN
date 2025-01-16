import { useState } from 'react'
import { format, parse, isWithinInterval } from 'date-fns'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/pdf-logo.svg'
import autoTable from 'jspdf-autotable'

const initialTransactions = [
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 628037', amount: 310, levy: 33.17 },
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 057371', amount: 439, levy: 46.873 },
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 129668', amount: 521, levy: 55.747 },
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 975608', amount: 220, levy: 23.54 },
  { transferDate: '25 June 2024', postingDate: '26 June 2024', description: 'Reference: 217381', amount: 391.50, levy: 41.8905 },
  { transferDate: '26 June 2024', postingDate: '27 June 2024', description: 'Reference: 231663', amount: 370, levy: 39.59 },
  { transferDate: '27 June 2024', postingDate: '28 June 2024', description: 'Reference: 171836', amount: 816, levy: 87.312 },
  { transferDate: '27 June 2024', postingDate: '28 June 2024', description: 'Reference: 778001', amount: 184, levy: 19.688 },
]

export default function TransactionsTable() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions)

  const filterTransactions = () => {
    if (!startDate || !endDate) return

    const filtered = initialTransactions.filter(transaction => {
      const date = parse(transaction.transferDate, 'd MMMM yyyy', new Date())
      return isWithinInterval(date, {
        start: parse(startDate, 'yyyy-MM-dd', new Date()),
        end: parse(endDate, 'yyyy-MM-dd', new Date())
      })
    })

    setFilteredTransactions(filtered)
  }

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
        doc.text('WALLET BALANCE STATEMENT', pageWidth / 2, 50, { align: 'center' });

        // Add customer details
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('AHMAD ASRAR - 10A Cranley Parade, SE9 4DZ', padding, 70);
        doc.text('Sort Code: 231486', padding, 80);
        doc.text('Account number: 15302980', padding, 90);

        // Add export date and time on the right with UK timezone
        const ukTime = new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/London',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        });
        const ukDate = format(new Date(), 'dd/MM/yyyy');
        doc.setFontSize(9);
        doc.text(`Duration: ${start} - ${end}`, pageWidth - padding, 98, { align: 'right' });
        doc.text(`Export Date: ${ukDate}`, pageWidth - padding, 105, { align: 'right' });

        // Table headers and data
        const tableData = filteredTransactions.map(transaction => [
          transaction.description.split(': ')[1],
          transaction.amount.toFixed(2),
          transaction.transferDate,
          '231486',
          '15302980'
        ]);

        // Add table with exact styling
        doc.autoTable({
          startY: 115,
          margin: { left: padding, right: padding }, // Add padding to the table
          head: [['Reference Number', 'Deposit Amount', 'Deposit Date', 'Sort Code', 'Account Number']],
          body: tableData,
          theme: 'grid',
          headStyles: {
            fillColor: [255 , 255 , 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 11,
            cellPadding: 1,
            lineColor: [0, 0, 0], // Black borders
            lineWidth: 0.1,
          },
          alternateRowStyles: {
            fillColor: [255, 255, 255], // Light gray for alternate rows
          },
          bodyStyles: {
            textColor: [0, 0, 0], // Black text
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
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Number</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Amount</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Date</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DTL (10.7%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.description.split(': ')[1]}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-blue-600">${transaction.amount.toFixed(2)}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.transferDate}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-green-600">${transaction.levy.toFixed(2)}</td>
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
              setFilteredTransactions(initialTransactions)
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

