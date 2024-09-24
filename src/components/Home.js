import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
        <nav className="navbar">
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
        </nav>
        <body className='main'>
            <h1>Welcome to the Chat App</h1>
        </body>
    </div>
  );
};

export default Home;