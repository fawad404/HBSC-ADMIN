import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Sidebar/Sidebar";
import { Calendar, CreditCard, Trash2, User, ChevronDown } from "lucide-react";

const DeleteTransactions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Dashboard Business Banking</title>
        <meta name="description" content="Welcome to the HSBC Dashboard. Manage your transactions and view your account information." />
      </Helmet>
      <div className="flex h-screen bg-white font-hsbc">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)]">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                  <Trash2 className="w-8 h-8 text-red-600" />
                  Delete Transactions
                </h1>
                <div className="h-1 w-20 bg-red-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <select className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300">
                    <option value="">Select User</option>
                  </select>
                 
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <select className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300">
                    <option value="">Select User's Card</option>
                  </select>
                 
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="group relative">
                    <label className="block text-sm text-gray-600 mb-2 font-medium">From Date</label>
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none mt-8">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                    />
                  </div>
                  <div className="group relative">
                    <label className="block text-sm text-gray-600 mb-2 font-medium">To Date</label>
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none mt-8">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                    />
                  </div>
                </div>

                <button className="w-full p-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Delete Transactions
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
