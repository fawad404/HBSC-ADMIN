import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../Sidebar/Sidebar";

function EditUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://hsbc-backend.vercel.app/api/v1/users/${id}`);
        const data = await response.json();
        console.log('Fetched user data:', data.user[0]); // Debug log
        setUserData(data.user[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the updated data object in the same format as ManageUsers
    const updatedData = {
    
      blocked: userData.blocked,
    //   cards: userData.cards,
    //   email: userData.email,
    //   username: userData.username,
    };

    console.log('Sending updated data:', updatedData); // Debug log

    try {
      const response = await fetch(`https://hsbc-backend.vercel.app/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData); // Debug log

      if (response.ok) {
        toast.success('User updated successfully');
        navigate('/dashboard/manage-users');
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  const handleInputChange = (e, cardIndex = null, field = null) => {
    if (cardIndex !== null) {
      // Handle card field updates
      const updatedCards = [...userData.cards];
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        [field]: e.target.value,
      };
      setUserData({ ...userData, cards: updatedCards });
    } else {
      // Handle main user field updates
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Edit User Details</title>
      </Helmet>
      <div className="flex h-screen bg-gray-100 font-hsbc">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-auto">
          <form onSubmit={handleSubmit} className="min-h-screen p-8 bg-white">
            <h1 className="text-2xl font-bold text-[#F00000] mb-5">
              Edit User Details
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
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
                      onChange={(e) => handleInputChange(e, index, 'cardNumber')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      CVV:
                    </label>
                    <input
                      type="text"
                      value={card.cvv || ''}
                      onChange={(e) => handleInputChange(e, index, 'cvv')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Expiry Month:
                    </label>
                    <input
                      type="text"
                      value={card.mm || ''}
                      onChange={(e) => handleInputChange(e, index, 'mm')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Expiry Year:
                    </label>
                    <input
                      type="text"
                      value={card.dd || ''}
                      onChange={(e) => handleInputChange(e, index, 'dd')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Address:
                    </label>
                    <input
                      type="text"
                      value={card.address || ''}
                      onChange={(e) => handleInputChange(e, index, 'address')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-[#F00000] text-white px-6 py-2 rounded hover:bg-[#d00000] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;
