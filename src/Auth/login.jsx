import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            setError(data.message || 'Login xatlik');
            throw new Error(data.message || 'Login xatolik');
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data?.accessToken) {
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.accessToken);
          navigate('/profile'); 
        } else {
          setError('Token kelmadi!');
        }
      })
      .catch((err) => {
        console.error('Xatolik:', err);
        setError('Networkka etibor bering!');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded p-2" required/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-2" required/>
          </div>
          <button type="submit" className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
