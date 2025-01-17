import React from 'react';
import PdfFetcher from '../pdfFetcher/PdfFetcher';
import { 
  Wallet, 
  CreditCard, 
  User, 
  Upload, 
  ChevronDown, 
  Bell,
  FileText 
} from 'lucide-react';

const BalanceUpdate = ({ users }) => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Update User Balance */}
      <section className="mb-10 bg-white p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Wallet className="w-6 h-6 text-red-600" />
          Update User Balance
        </h2>
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300">
              <option>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
            placeholder="Enter New Balance"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="p-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
            <Upload className="h-5 w-5" />
            Post
          </button>
          <button className="p-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
            <Bell className="h-5 w-5" />
            Post & Notify
          </button>
        </div>
      </section>

      {/* Update Transactions Auto */}
      <section className="mb-10 bg-white p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-red-600" />
          Update Transactions Auto
        </h2>
        <div className="mb-6">
          <PdfFetcher />
        </div>
        <button className="w-full p-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
          <Upload className="h-5 w-5" />
          Post
        </button>
      </section>

      {/* Update Transactions Manual */}
      <section className="bg-white p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-red-600" />
          Update Transactions Manual
        </h2>
        <div className="space-y-4 mb-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300">
              <option>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            
          </div>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300">
              <option>Select User's card</option>
              <option value="card1">Card 1</option>
              <option value="card2">Card 2</option>
            </select>
            
          </div>
        </div>
        <div className="mb-6">
          <PdfFetcher />
        </div>
        <button className="w-full p-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
          <Upload className="h-5 w-5" />
          Post
        </button>
      </section>
    </div>
  );
};

export default BalanceUpdate;
