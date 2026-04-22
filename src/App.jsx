import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GamePage from './pages/GamePage'
import AdminPage from './pages/AdminPage'
import ToastContainer from './components/ui/ToastContainer'

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/"               element={<LandingPage />} />
        <Route path="/game/:sessionId" element={<GamePage />} />
        <Route path="/admin"          element={<AdminPage />} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
