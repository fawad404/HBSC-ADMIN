import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { Users, Eye, Edit, Trash2, UserPlus, Lock, Unlock } from 'lucide-react';

function ManageUsers() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
    
        const fetchUsers = async () => {
          
            try {
             // setLoading(true);
              const response = await fetch(`https://hsbc-backend.vercel.app/api/v1/users`);
               
              let data = await response.json();
              data = data.getAllUsers;
              console.log(data);
              setUsers(data);
             
            //  setFilteredTransactions(data.accounts);
            //   setLoading(false);
            } catch (error) {
            //   setError(error.message);
            //   setLoading(false);
            }
          
        };
        fetchUsers();
        
      }, []);

    const handleAddNew = () => {
        navigate("/dashboard/manage-users/add-new");
    };
    const handleViewUser = (id) => {
        navigate(`/dashboard/view-user/${id}`);
    };
    const handleEditUser = (id) => {
        navigate(`/dashboard/edit-user/${id}`);
    };      
    const toggleBlockStatus = (email) => {
        // Update the local state for users
        setUsers(users.map(user =>
            user.email === email ? { ...user, blocked: !user.blocked } : user
        ));
    
        // Find the user by email to get their ID and updated status
        const userToUpdate = users.find(user => user.email === email);
        if (userToUpdate) {
            const updatedData = { blocked: !userToUpdate.blocked }; // Toggle the blocked status
            updatedUserStatus(userToUpdate._id, updatedData); // Pass the userId and updatedData
        }
    };
    
    const updatedUserStatus = async (userId, updatedData) => {
        try {
            const response = await fetch(`https://hsbc-backend.vercel.app/api/v1/users/${userId}`, {
                method: 'PUT', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json', // Set the appropriate content type
                },
                body: JSON.stringify(updatedData), // Send the updated data as a JSON string
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json(); // Parse the JSON response
            console.log('User updated successfully:', data);
    
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
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
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <div className="container mx-auto px-4 py-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 max-w-[95%] mx-auto">
                                <div className="flex items-center mb-8">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-8 h-8 text-[#F00000]" />
                                        <h1 className="text-3xl font-bold text-[#F00000]">Manage Users</h1>
                                    </div>
                                </div>

                                <div className="overflow-x-auto mb-6">
                                    <table className="w-full border-collapse">
                                        <thead className="bg-gray-50">
                                            <tr className="text-left">
                                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-1/2">Email</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-1/2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 w-1/2">
                                                        <a href="#" className="text-[#191329] hover:text-[#F00000] flex items-center gap-2">
                                                            {user.email}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 w-1/2">
                                                        <div className="flex items-center justify-start space-x-8">
                                                           
                                                            <button onClick={() => handleViewUser(user._id)}
                                                             className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-[#F00000] transition-colors rounded-md hover:bg-red-50">
                                                                <Eye className="w-4 h-4" />
                                                                <span>View</span>
                                                            </button>
                                                            <button 
                                                                onClick={() => toggleBlockStatus(user.email)}
                                                                className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors
                                                                    ${user.blocked ? 
                                                                    'text-red-500 hover:text-red-600 hover:bg-red-50' : 
                                                                    'text-green-500 hover:text-green-600 hover:bg-green-50'}`}
                                                            >
                                                                {user.blocked ? (
                                                                    <>
                                                                        <Lock className="w-4 h-4" />
                                                                        <span>Blocked</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Unlock className="w-4 h-4" />
                                                                        <span>Active</span>
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button onClick={() => handleEditUser(user._id)}
                                                             className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-[#F00000] transition-colors rounded-md hover:bg-red-50">
                                                                <Edit className="w-4 h-4" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button 
                                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-[#F00000] transition-colors rounded-md hover:bg-red-50"
                                                                onClick={() => window.confirm("Are you sure you want to delete this user?")}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-center mt-8 pt-4 border-t border-gray-100">
                                    <button 
                                        className="bg-[#F00000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#b80000] transition-colors flex items-center gap-2"
                                        onClick={handleAddNew}
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        Add New User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ManageUsers;
