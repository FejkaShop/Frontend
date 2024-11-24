'use client';

import { useCart } from "../context/cart-context";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <div className="flex justify-between items-center p-3 bg-gradient-to-l from-[#6c9695]">
      <div>
        <img src="/images/logo_cropped.png" alt="logo" className="h-12" />
      </div>
      <h1 className="text-4xl font-bold text-white">FEJKA SHOP</h1>
      <div>
        <button className="bg-white text-black p-2 rounded-lg" onClick={() => {window.location.href = '/cart'}}>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="ml-2">{cart.length}</span>
            <span className="ml-1">({cart.reduce((total, item) => total + item.quantity, 0)})</span>
          </div>
        </button>
      </div>
    </div>
  );
}
