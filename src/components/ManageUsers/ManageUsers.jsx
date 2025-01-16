import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";


function ManageUsers() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const handleAddNew = () => {
        navigate("/dashboard/manage-users/add-new");
      };
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
      <h1 className="text-2xl font-bold mt-10 mb-5 text-[#F00000]">
        Manage Users
      </h1>
      <div className="w-full max-w-3xl">
        <table className="w-full border-collapse bg-white text-[#191329] rounded-lg shadow-lg">
          <thead>
            <tr className="text-left">
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-300">
              <td className="p-4">
                <a
                  href="#"
                  className="text-[#191329] underline hover:text-[#F00000]"
                >
                  team49T@senergysolutions.co.uk
                </a>
              </td>
              <td className="p-4 flex space-x-4">
                <button className="text-sm font-bold hover:text-[#F00000]">
                  View
                </button>
                <button className="text-sm font-bold hover:text-[#F00000]">
                  Block
                </button>
                <button className="text-sm font-bold hover:text-[#F00000]">
                  Unblock
                </button>
                <button className="text-sm font-bold hover:text-[#F00000]">
                  Edit
                </button>
                <button
                  className="text-sm font-bold hover:text-[#F00000]"
                  onClick={() =>
                    window.confirm(
                      "Are you sure you want to delete this user?"
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="p-4">
                <a
                  href="#"
                  className="text-[#191329] underline hover:text-[#F00000]"
                >
                  User49T@senergysolutions.co.uk
                </a>
              </td>
              <td className="p-4 flex space-x-4">
                <button className="text-sm font-bold hover:text-[#F00000]">
                  View
                </button>
                <button className="text-sm font-bold hover:text-[#F00000]">
                  Block
                </button>
                <button className="text-sm font-bold hover:text-[#F00000]">
                  Unblock
                </button>
                <button className="text-sm font-bold hover:text-[#F00000]">
                  Edit
                </button>
                <button
                  className="text-sm font-bold hover:text-[#F00000]"
                  onClick={() =>
                    window.confirm(
                      "Are you sure you want to delete this user?"
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="p-4 text-gray-400">-</td>
              <td className="p-4 text-gray-400">-</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <button 
          className="bg-[#F00000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#b80000]"
          onClick={handleAddNew}
          >
            Add New
          </button>
        </div>
      </div>
    </div>

      </div>
      </div>

    
    </>
  );
}

export default ManageUsers;
