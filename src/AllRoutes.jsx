import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Charts } from '@/pages/dashboard1/Dashboard'
import { DashSidebar } from './pages/dashboard/DashSidebar'
import Simulation from './pages/simulation/Simulation'
import OilSpillDetectionPortal from './pages/detectionPortal/Portal'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Charts />} /> 
        <Route path="/" element={<DashSidebar />} /> 
        <Route path="/simulation" element={<Simulation />} /> 
        <Route path="/portal" element={<OilSpillDetectionPortal />} /> 
    </Routes>
  )
}
