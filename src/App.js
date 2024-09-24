import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/ApolloClient';
import Home from './components/Home';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import ChatPage from './components/Chat';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/chat" element={<ChatPage />} />
            </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
