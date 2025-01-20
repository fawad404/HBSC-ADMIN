import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import ManageCards from './Pages/ManageCards/ManagecardsP'
import CardDetails from './Pages/CardDetails/Carddetails'
import Register from './components/register/Register'
import ManageUsers from './components/ManageUsers/ManageUsers'
import AddNewUser from './components/addNewUser/AddNewUser'
import DeleteTransactions from './components/deleteTransections/DeleteTransections'
import AddTaxx from './Pages/Add Tax/AddTax'
import ManualTrans from './Pages/Manual Trans/ManualTrans'
import ViewUser from './components/View User/ViewUser'
import EditUser from './components/Edit User/Edituser'


const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/manage-users" element={<ManageUsers />} />
        <Route path="/dashboard/manage-users/add-new" element={<AddNewUser />} />
        <Route path="/dashboard/delete-transections" element={<DeleteTransactions />} />
        <Route path="/dashboard/manage-cards/:id" element={<CardDetails />} />
        <Route path="/dashboard/add-tax" element={<AddTaxx />} />
        <Route path="/dashboard/manual-transections" element={<ManualTrans />} />
        <Route path="/dashboard/view-user/:id" element={<ViewUser />} />
        <Route path="/dashboard/edit-user/:id" element={<EditUser />} />
      </Routes>
    </>
  )
}

export default App
