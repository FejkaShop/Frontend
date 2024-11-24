'use client'

import { useCart } from '../context/cart-context';
import { useState } from 'react';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setIsUpdating(true);
    updateQuantity(id, quantity);
    setIsUpdating(false);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-700">Your Cart is Empty</h2>
          <p className="text-lg text-gray-500 mt-4">It looks like you haven't added anything to your cart yet. Start shopping now!</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 inline-block bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-500"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="w-full max-w-4xl">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <Image
                src={item.image || '/images/placeholder.png'}
                alt={item.name}
                width={100}
                height={100}
                objectFit="cover"
              />
              <div className="ml-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="w-16 p-2 border rounded-md"
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-4xl flex justify-between items-center p-4 bg-gray-100 mt-8 rounded-lg shadow-md">
        <button
          onClick={handleClearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Clear Cart
        </button>
        <div className="text-xl font-semibold">
          Total: ${calculateTotal().toFixed(2)}
        </div>
        <button
          onClick={() => alert('Proceeding to checkout...')}
          className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
