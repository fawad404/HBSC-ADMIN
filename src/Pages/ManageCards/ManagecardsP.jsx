import React , {useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ManageCards from '../../components/ManageCard/ManageCard'
import Info from '../../components/MobilebankingInfo/Info'
import Header from '../../components/Dashbooard Header/Header'

const ManagecardsP = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex h-screen font-hsbc">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
      <Info />
       
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="px-6 py-8">
           <ManageCards />
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 p-4">
          <p className="text-center text-gray-600 text-sm">
            HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved
          </p>
        </footer>
      </div>
    </div>
  )
}

export default ManagecardsP
