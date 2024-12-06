'use client';

import React, { useState } from 'react';
import { useCart } from '../context/cart-context';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'CREDIT_CARD',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [orderPlaced, setOrderPlaced] = useState(false);

const handleCheckout = (e: React.FormEvent) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty. Add items before checking out.');
    return;
  }

  const user = localStorage.getItem('user');
  if (!user) {
    toast.error('Please login before placing an order.');
    return;
  }

  fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: JSON.parse(user).id,
      orderItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Order placed successfully:', data);
      setOrderPlaced(true);
    })
    .catch((error) => {
      console.error('Error placing order:', error);
    });

  clearCart();
};

if (orderPlaced) {
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-700">Thank You!</h2>
        <p className="text-lg text-gray-500 mt-4">Your order has been placed successfully.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-4 inline-block bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-500"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleCheckout} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-semibold text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block font-semibold text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-500"
          >
            Place Order
          </button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4 flex justify-between items-center">
            <p className="font-semibold text-lg">Total:</p>
            <p className="font-semibold text-lg">
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
