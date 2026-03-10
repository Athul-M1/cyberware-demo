import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import History from './pages/History'
import Statistics from './pages/Statistics'
import Docs from './pages/Docs'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminUsers from './admin/AdminUsers'
import AdminScans from './admin/AdminScans'
import AdminBlocked from './admin/AdminBlocked'
import AdminIntelligence from './admin/AdminIntelligence'
import { GuestRoute, ProtectedRoute } from './components/PrivateRoute'

const App = () => {
  return (
    <Routes>
      {/* Public Routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />

        {/* User Specific Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/history" element={<History />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Route>

      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin-only protected routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="scans" element={<AdminScans />} />
          <Route path="blocked" element={<AdminBlocked />} />
          <Route path="intelligence" element={<AdminIntelligence />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
