import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Sidebar/Sidebar";

const DeleteTransactions = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
            <Helmet>
      <title>Dashboard Business Banking</title>
      <meta name="description" content="Welcome to the HSBC Dashboard. Manage your transactions and view your account information." />
    </Helmet>
    <div className="flex h-screen bg-gray-100 font-hsbc">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    
      <div className="flex-1 flex flex-col overflow-hidden">
  
  <div className="min-h-screen flex flex-col items-center bg-white text-white">
      <div className="w-full max-w-md p-6 bg-[#191329] rounded-lg shadow-md">
        <h1 className="text-lg font-bold text-center text-[#F00000] mb-4">
          Delete Transactions
        </h1>
        <div className="space-y-4">
          <select
            className="w-full p-3 bg-[#F00000] text-white rounded-lg focus:outline-none"
            >
            <option>Select User</option>
          </select>
          <select
            className="w-full p-3 bg-[#F00000] text-white rounded-lg focus:outline-none"
            >
            <option>Select User's Card</option>
          </select>
          <div className="flex space-x-4">
            <input
              type="date"
              className="w-full p-3 bg-[#F00000] text-white rounded-lg focus:outline-none"
              placeholder="From Date"
              />
            <input
              type="date"
              className="w-full p-3 bg-[#F00000] text-white rounded-lg focus:outline-none"
              placeholder="To Date"
              />
          </div>
          <button
            className="w-full p-3 bg-[#F00000] text-white font-bold rounded-lg hover:bg-red-700"
            >
            Delete
          </button>
        </div>
        </div>
        </div>
      </div>
    </div>
              </>
  );
};

export default DeleteTransactions;
