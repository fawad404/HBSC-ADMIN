import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import CardHeader from '../../components/CardHeader/CardHeader'
import Sidebar from '../../components/Sidebar/Sidebar'
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable'
import WelcomeBanner from '../../components/WElcome/Welcome'
import Info from '../../components/MobilebankingInfo/Info'
import CardsTransactions from '../../components/CardsTransections/CardsTransections'

export default function CardDetails() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    if (!id) return;

    const cards = [
      { id: "1", name: "JOHN SMITH", number: "1265 7896 3658 75", cvv: "675", expiry: "06/26", billingAddress: "123 Oak Street, London, SE1 4XY" },
      { id: "2", name: "SARAH WILSON", number: "4532 8721 9012 3456", cvv: "123", expiry: "09/25", billingAddress: "45 Maple Road, Manchester, M1 5WX" },
      { id: "3", name: "MICHAEL BROWN", number: "5678 1234 5678 9012", cvv: "456", expiry: "12/24", billingAddress: "78 Pine Lane, Birmingham, B1 2ZY" },
      { id: "4", name: "EMMA DAVIS", number: "9012 3456 7890 1234", cvv: "789", expiry: "03/25", billingAddress: "90 Cedar Avenue, Leeds, LS1 3AB" },
      { id: "5", name: "JAMES TAYLOR", number: "3456 7890 1234 5678", cvv: "321", expiry: "08/26", billingAddress: "12 Elm Court, Glasgow, G1 4CD" },
      { id: "6", name: "LISA ANDERSON", number: "7890 1234 5678 9012", cvv: "654", expiry: "11/25", billingAddress: "34 Birch Close, Bristol, BS1 5EF" },
    ];
    
    const card = cards.find(c => c.id === id);
    setCardDetails(card || null);
  }, [id]);

  return (
    <>
    <Helmet>
      <title>Dashboard Business Banking</title>
      <meta name="description" content="Welcome to the HSBC Dashboard. Manage your transactions and view your account information." />
    </Helmet>
    <div className="flex h-screen bg-gray-100 font-hsbc">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
      <Info />
        <CardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} cardDetails={cardDetails} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="px-6 py-8">
            <WelcomeBanner />
            <CardsTransactions cardDetails={cardDetails} />
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 p-4">
          <p className="text-center text-gray-600 text-sm">
            HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved
          </p>
        </footer>
      </div>
    </div>
    </>
  )
}

