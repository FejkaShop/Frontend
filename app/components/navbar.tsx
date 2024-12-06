'use client';

import { useCart } from '../context/cart-context';
import { useAuth } from '../context/auth-context';
import { useState } from 'react';
import { toast } from 'react-toastify';

function LoginPopup({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      toast.success('Login successful');
      onClose();
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <button className="mr-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded" onClick={handleLogin}>
          Login
        </button>
        <button
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-3 bg-gradient-to-l from-[#6c9695]">
      <div onClick={() => { window.location.href = '/' }} className="cursor-pointer">
        <img src="/images/logo_cropped.png" alt="logo" className="h-12" />
      </div>
      <h1 className="text-4xl font-bold text-white">FEJKA SHOP</h1>
      <div className="flex items-center">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user.name}</span>
            <button
              className="bg-white text-black p-2 rounded-lg"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-white text-black p-2 rounded-lg"
            onClick={() => setIsLoginPopupOpen(true)}
          >
            Login
          </button>
        )}
        <button
          className="bg-white text-black p-2 rounded-lg ml-4"
          onClick={() => { window.location.href = '/cart' }}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="ml-2">{cart.length}</span>
            <span className="ml-1">({cart.reduce((total, item) => total + item.quantity, 0)})</span>
          </div>
        </button>
      </div>
      {isLoginPopupOpen && <LoginPopup onClose={() => setIsLoginPopupOpen(false)} />}
    </div>
  );
}
