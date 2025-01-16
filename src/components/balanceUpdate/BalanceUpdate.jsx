import React from 'react';
import PdfFetcher from '../pdfFetcher/PdfFetcher';

const BalanceUpdate = ({ users }) => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Update User Balance */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Update User Balance</h2>
        <div className="flex space-x-4 mb-4">
          <select className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-1/2 p-2 border border-gray-300 rounded"
            placeholder="Enter New Balance here"
          />
        </div>
        <div className="flex space-x-4">
          <button className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Post
          </button>
          <button className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Post & Notify
          </button>
        </div>
      </section>

      {/* Update Transactions Auto */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Update Transactions Auto</h2>
        <div className="mb-4">
          {/* <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
          <PdfFetcher />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Post
        </button>
      </section>

      {/* Update Transactions Manual */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Update Transactions Manual</h2>
        <div className="flex space-x-4 mb-4">
          <select className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <select className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Select User's card</option>
            {/* Dummy options for user's cards */}
            <option value="card1">Card 1</option>
            <option value="card2">Card 2</option>
          </select>
        </div>
        <div className="mb-4">
        <PdfFetcher />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Post
        </button>
      </section>
    </div>
  );
};

export default BalanceUpdate;
