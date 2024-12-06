'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cart-context';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: {
    id: number;
    name: string;
    description: string;
  };
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Image cycling index
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const productId = params.id;

    fetch(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product) return <p>Product not found.</p>;

  // Handlers for cycling through images
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        {product.images.length > 0 && (
          <div className="relative w-full md:w-1/2">
            <Image
              src={`http://localhost:3000/images/${product.images[currentImageIndex]}`}
              alt={product.name}
              width={600}
              height={400}
              objectFit="cover"
              className="w-full h-auto"
            />
            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 opacity-75 hover:opacity-100"
              onClick={handlePrevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 opacity-75 hover:opacity-100"
              onClick={handleNextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}

        {/* Product Details Section */}
        <div className="p-6 w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-gray-800 mt-4 text-lg font-semibold">
            Price: ${product.price}
          </p>
          <p className="text-gray-500 mt-2">Stock: {product.stock}</p>
          <p className="text-gray-700 mt-4">
            Category: <strong>{product.category.name}</strong>
          </p>
          <p className="text-gray-500">{product.category.description}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            <button className="bg-teal-700 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded"
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

            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => router.push('/')}>
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
