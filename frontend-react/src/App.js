import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Contacts from './components/Contacts';
import Header from './components/Header';
import './css/index.css';

const App = () => {
  const [auth, setAuth] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', { method: 'GET' });
      if (response.ok) {
        setAuth(false);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/dashboard" element={auth ? <Dashboard auth={auth} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/contacts" element={auth ? <Contacts auth={auth} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/schedule" element={auth ? <Schedule auth={auth} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
