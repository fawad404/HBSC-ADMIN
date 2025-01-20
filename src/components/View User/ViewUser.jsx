import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

function ViewUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://hsbc-backend.vercel.app/api/v1/users/${id}`);
        const data = await response.json();
        // Access first user in the array
        setUserData(data.user[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  // Update format function to handle separate dd/mm
  const formatExpiryDate = (card) => {
    if (card && card.mm && card.dd) {
      return `${card.mm}/${card.dd}`;
    }
    return '--/--';
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>View User Details</title>
      </Helmet>
      <div className="flex h-screen bg-gray-100 font-hsbc">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="min-h-screen p-8 bg-white">
            <h1 className="text-2xl font-bold text-[#F00000] mb-5">
              User Details
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  value={userData.username || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  value={userData.email || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Account Status:
                </label>
                <input
                  type="text"
                  value={userData.blocked ? 'Blocked' : 'Active'}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                />
              </div>

              <h2 className="text-xl font-bold text-[#191329] mt-8">
                Card Details
              </h2>
              {userData.cards && userData.cards.map((card, index) => (
                <div key={card._id} className="space-y-4 mt-4">
                  <h3 className="font-bold text-[#F00000]">
                    Card {index + 1} Details:
                  </h3>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Card Number:
                    </label>
                    <input
                      type="text"
                      value={card.cardNumber || ''}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      CVV:
                    </label>
                    <input
                      type="text"
                      value={card.cvv || ''}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Expiry Date:
                    </label>
                    <input
                      type="text"
                      value={formatExpiryDate(card)}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Address:
                    </label>
                    <input
                      type="text"
                      value={card.address || ''}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
