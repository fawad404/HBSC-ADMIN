import React, { useState } from 'react';
import PdfFetcher from '../pdfFetcher/PdfFetcher';

const BalanceUpdate = ({ users }) => {
  const [sortedTransactions, setSortedTransactions] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState('');
  // State to hold the selected user ID
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userAmount, setUserAmount] = useState(null);

  // Callback function to receive transactions from PdfFetcher
  const handleTransactionsUpdate = (transactions) => {
    setSortedTransactions(transactions);
  };

  const handleUserChangeWT = (e) => {
    const userId = e.target.value;

    // Find the selected user and their cards
    const user = users.find((u) => u._id === userId);
    setSelectedUser(user.username);

    // Set the cards for the selected user (replace `cards` with your data structure)
    setUserCards(user ? user.cards : []);
    
  };
  
  const handleCardChange = (e) => {
    const cardNumber = e.target.value;
    setSelectedCard(cardNumber);
    
  };
  // Handle user selection change
  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
   // console.log('Selected User ID:', userId);
  };
  console.log(userCards? userCards : []);
  const handleInputChange = (event) => {
    const amount = event.target.value;
    setUserAmount(amount);
    //console.log('Entered amount is:', amount);
  };

  const addBalance = async() => {
    if(selectedUserId && userAmount){
      try {
      //  setLoading(true);
        const response = await fetch('https://hsbc-backend.vercel.app/api/v1/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: selectedUserId, // Ensure cardNumber is available
            amount: userAmount,
          }),
        });
        const data = await response.json();
        console.log(data);
        //const transactions = data.transections || [];
        //setTransactions(transactions);
        //setLoading(false);
      } catch (error) {
        //setError(error.message);
        //setLoading(false);
      }
    }
  }

  const handlePostClick = async () => {
    if (sortedTransactions) {
      const sortedByDate = Object.entries(sortedTransactions).sort(
        ([, txnA], [, txnB]) => new Date(txnB.date) - new Date(txnA.date)
      );

      const sortedTransactionsByDate = Object.fromEntries(sortedByDate);

      console.log('Sorted transactions by date:', sortedTransactionsByDate);

      const response = await fetch('https://hsbc-backend.vercel.app/api/v1/transections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactions: Object.values(sortedTransactionsByDate),
          cardHolderName: selectedUser,
          cardNumber: selectedCard,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Update User Balance</h2>
        <div className="flex space-x-4 mb-4">
          <select
            className="w-1/2 p-2 border border-gray-300 rounded"
            onChange={handleUserChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-1/2 p-2 border border-gray-300 rounded"
            placeholder="Enter New Balance here"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex space-x-4">
          <button 
          onClick={addBalance}
          className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Post
          </button>
          <button className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Post & Notify
          </button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Update Transactions Auto</h2>
        <PdfFetcher onTransactionsUpdate={handleTransactionsUpdate} />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handlePostClick}
        >
          Post
        </button>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Update Transactions Manual</h2>
        <div className="flex space-x-4 mb-4">
          <select
          onChange={handleUserChangeWT}
           className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <select
           onChange={handleCardChange}
           className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Select User's card</option>
            {userCards.map((card, index) => (
          <option key={index} value={card.cardNumber}>
            {card.cardNumber}
          </option>
        ))}
          </select>
        </div>
        <PdfFetcher onTransactionsUpdate={handleTransactionsUpdate} />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handlePostClick}
        >
          Post
        </button>
      </section>
    </div>
  );
};

export default BalanceUpdate;
