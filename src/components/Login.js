import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../GraphQL/mutations/auth';
import '../styles/Form.css';

const Login = () => {
  const [username, setEmail] = useState(''); // Updated from username to username
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username, password } });
      localStorage.setItem('token', data.login.token);
      console.log(data)
      navigate('/chat');
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <input
          type="username"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
