import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute, { ProtectedHome } from './protected/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthorPanel from './pages/Author/AuthorPanel';
import AdminPanel from './pages/Admin/AdminPanel';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ProtectedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author" element={<Navigate to="/author/dashboard" replace />} />
        <Route
          path="/author/dashboard"
          element={
            <ProtectedRoute allowedRoles={['author']}>
              <AuthorPanel defaultSection='Dashboard' />
            </ProtectedRoute>
          }
        />
        <Route
          path="/author/posts"
          element={
            <ProtectedRoute allowedRoles={['author']}>
              <AuthorPanel defaultSection='Posts' />
            </ProtectedRoute>
          }
        />
        <Route
          path="/author/profile"
          element={
            <ProtectedRoute allowedRoles={['author']}>
              <AuthorPanel defaultSection='Profile' />
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
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel defaultSection='Users'/>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
