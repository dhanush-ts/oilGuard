import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Charts } from '@/pages/dashboard1/Dashboard'
import { DashSidebar } from './pages/dashboard/DashSidebar'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Charts />} /> 
        <Route path="/" element={<DashSidebar />} /> 
    </Routes>
  )
}
