import { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Sidebar/Sidebar";

function AddNewUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(
    Array(6).fill({
      number: "0000000000000000",
      cvv: "000",
      exp: "00/00",
      address: "Default",
    })
  );

  const handleCardChange = (index, field, value) => {
    setCardDetails((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Add New User</title>
      </Helmet>
      <div className="flex h-screen bg-gray-100 font-hsbc">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="min-h-screen p-8 bg-white">
            <h1 className="text-2xl font-bold text-[#F00000] mb-5">
              Add New User
            </h1>
            <form className="space-y-4">
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Full Name:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Username or Email:
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[#191329] font-bold mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <h2 className="text-xl font-bold text-[#191329] mt-8">
                Card Details
              </h2>
              {cardDetails.map((card, index) => (
                <div key={index} className="space-y-4 mt-4">
                  <h3 className="font-bold text-[#F00000]">
                    Card {index + 1} Details:
                  </h3>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Card Number:
                    </label>
                    <input
                      type="text"
                      value={card.number}
                      onChange={(e) =>
                        handleCardChange(index, "number", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      CVV:
                    </label>
                    <input
                      type="text"
                      value={card.cvv}
                      onChange={(e) =>
                        handleCardChange(index, "cvv", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Expiry Date:
                    </label>
                    <input
                      type="text"
                      value={card.exp}
                      onChange={(e) =>
                        handleCardChange(index, "exp", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#191329] font-bold mb-2">
                      Address:
                    </label>
                    <input
                      type="text"
                      value={card.address}
                      onChange={(e) =>
                        handleCardChange(index, "address", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  
                </div>
                
              ))}
              <div className="flex mt-6">
          <button 
          className="bg-[#F00000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#b80000]"
         
          >
            Save
    
              </button>
              <button 
          className="bg-[#F00000] text-white ml-4 px-6 py-2 rounded-lg font-bold hover:bg-[#b80000]"
         
          >
            Rest
    
              </button>
        </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewUser;
