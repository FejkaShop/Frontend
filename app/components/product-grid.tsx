'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '../context/cart-context';

export default function ProductGrid() {
  type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
  };

  const { addToCart } = useCart();
  // Get products from API
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.entries)) {
          setProducts(data.entries);
        } else {
          throw new Error('Response is not an array');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-2xl rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
            <Image
              src={product.images[0] ? `${product.images[0]}` : '/images/placeholder.png'}
              alt={product.name}
              width={300}
              height={300}
              objectFit="cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-gray-800 mt-2">${product.price}</p>
              <p className="text-gray-500">Stock: {product.stock}</p>

              <button
                className="mt-4 bg-teal-700 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded"
                onClick={() => 
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images[0] || '/images/placeholder.png'
                  })
                }
              >
                Add to Cart
              </button>

              <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => window.location.href = `/${product.id}`}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
