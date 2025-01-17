import React, { useState } from 'react';
import { Calendar, DollarSign, Type, Globe, Plus } from 'lucide-react';

const AddTax = () => {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    name: '',
    amount: '',
    currency: 'USD'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <section className="bg-white p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-red-600" />
          Add Tax Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Range Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                  value={formData.toDate}
                  onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tax Name</label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter tax name"
              />
            </div>
          </div>

          {/* Amount and Currency Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 appearance-none"
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Tax</span>
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddTax;
