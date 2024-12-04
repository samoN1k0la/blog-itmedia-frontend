import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './protected/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthorPanel from './pages/Author/AuthorPanel';
import AdminPanel from './pages/Admin/AdminPanel';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/author"
          element={
            <ProtectedRoute allowedRoles={['author']}>
              <AuthorPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route 
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel defaultSection='Dashboard'/>
            </ProtectedRoute>}
        />
        <Route
          path="/admin/authors"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel defaultSection='Authors'/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel defaultSection='Moderation'/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel defaultSection='Reports'/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel defaultSection='Settings'/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
