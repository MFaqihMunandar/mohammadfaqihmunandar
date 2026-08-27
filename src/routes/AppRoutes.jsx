import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from '../pages/PortfolioPage';
import DemoPage from '../pages/DemoPage';
import ProtectedRoute from './ProtectedRoute';

// Placeholder Pages for Demonstration
const LoginPage = () => <div style={{ padding: 40 }}><h2>Login Page</h2></div>;
const DashboardPage = () => <div style={{ padding: 40 }}><h2>Private Dashboard</h2></div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<div style={{ padding: 40 }}>404 Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;