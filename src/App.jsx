import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import ManageCards from './Pages/ManageCards/ManagecardsP'
import CardDetails from './Pages/CardDetails/Carddetails'
import Register from './components/register/Register'
const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/manage-cards" element={<ManageCards />} />
        <Route path="/dashboard/manage-cards/:id" element={<CardDetails />} />
      </Routes>
    </>
  )
}

export default App
