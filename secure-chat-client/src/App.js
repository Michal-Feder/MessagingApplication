import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavbarComponent from './components/NavbarComponent';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import AuthRedirect from './components/AuthRedirect';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarComponent />
        <Routes>
        <Route path="/" element={<AuthRedirect />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
