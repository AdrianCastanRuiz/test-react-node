import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
