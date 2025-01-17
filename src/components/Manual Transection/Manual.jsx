import React, { useState } from 'react';
import { 
  User, CreditCard, Calendar, Hash, 
  AlignLeft, DollarSign, Globe, Save 
} from 'lucide-react';

const Manual = ({ users = [] }) => {
  const [formData, setFormData] = useState({
    userId: '',
    cardId: '',
    refNo: '',
    date: '',
    description: '',
    amount: '',
    currency: 'USD'
  });

  return (
    <div className="min-h-screen">
      <div className="w-full    ">
        <div className="backdrop-blur-lg bg-white/80 p-8 rounded-3xl shadow-2xl border border-gray-100">
          {/* Header */}
          <div className="relative mb-10 pb-6 border-b border-gray-200">
            <div className="absolute -left-10 -top-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -right-10 -top-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-red-600" />
              <span>Manual Transaction Entry</span>
            </h2>
            <p className="mt-2 text-gray-600">Enter the transaction details below</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {/* User and Card Selection Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                  Select User
                </label>
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                >
                  <option value="">Choose a user...</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="group relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                  Select Card
                </label>
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <select
                  value={formData.cardId}
                  onChange={(e) => setFormData({...formData, cardId: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                >
                  <option value="">Select a card...</option>
                  <option value="card1">**** **** **** 1234</option>
                  <option value="card2">**** **** **** 5678</option>
                </select>
              </div>
            </div>

            {/* Reference and Date Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                  Reference Number
                </label>
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <input
                  type="text"
                  value={formData.refNo}
                  onChange={(e) => setFormData({...formData, refNo: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                  placeholder="Enter reference number"
                />
              </div>

              <div className="group relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                  Transaction Date
                </label>
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="group relative">
              <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                Transaction Description
              </label>
              <AlignLeft className="absolute left-4 top-6 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300 min-h-[120px] resize-none"
                placeholder="Enter transaction details..."
              />
            </div>

            {/* Amount and Currency Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                  Amount
                </label>
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                  placeholder="0.00"
                />
              </div>

              <div className="group relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold text-gray-600 transition-all group-focus-within:text-red-600">
                  Currency
                </label>
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-2xl 
                       hover:from-red-700 hover:to-red-600 transform hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-300 shadow-xl hover:shadow-red-500/25
                       flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Save className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Store Transaction</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Manual;
