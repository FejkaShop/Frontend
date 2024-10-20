import Image from 'next/image';

export default function ProductGrid() {
  var products = [
    {
       "id":2,
       "name":"T-shirt",
       "description":"Comfortable cotton T-shirt",
       "price":19.99,
       "stock":100,
       "categoryId":2,
       "images":[
          "tshirt1.png",
          "tshirt2.jpg"
       ],
       "createdAt":"2024-10-19T16:23:36.889Z",
       "updatedAt":"2024-10-19T16:23:36.889Z",
       "category":{
          "id":2,
          "name":"Clothing",
          "description":"Apparel and accessories"
       }
    },
    {
       "id":3,
       "name":"test",
       "description":null,
       "price":50,
       "stock":200,
       "categoryId":1,
       "images":[
          
       ],
       "createdAt":"2024-10-19T16:46:12.886Z",
       "updatedAt":"2024-10-19T16:46:12.886Z",
       "category":{
          "id":1,
          "name":"Electronics",
          "description":"Devices and gadgets"
       }
    },
    {
       "id":4,
       "name":"test",
       "description":null,
       "price":50,
       "stock":200,
       "categoryId":1,
       "images":[
          
       ],
       "createdAt":"2024-10-19T16:48:18.549Z",
       "updatedAt":"2024-10-19T16:48:18.549Z",
       "category":{
          "id":1,
          "name":"Electronics",
          "description":"Devices and gadgets"
       }
    },
    {
       "id":5,
       "name":"test",
       "description":null,
       "price":50,
       "stock":200,
       "categoryId":1,
       "images":[
          
       ],
       "createdAt":"2024-10-19T16:49:52.180Z",
       "updatedAt":"2024-10-19T16:49:52.180Z",
       "category":{
          "id":1,
          "name":"Electronics",
          "description":"Devices and gadgets"
       }
    },
    {
       "id":6,
       "name":"test",
       "description":null,
       "price":50,
       "stock":200,
       "categoryId":1,
       "images":[
          
       ],
       "createdAt":"2024-10-19T16:50:49.700Z",
       "updatedAt":"2024-10-19T16:50:49.700Z",
       "category":{
          "id":1,
          "name":"Electronics",
          "description":"Devices and gadgets"
       }
    },
    {
       "id":7,
       "name":"test",
       "description":null,
       "price":50,
       "stock":200,
       "categoryId":1,
       "images":[
          
       ],
       "createdAt":"2024-10-19T16:50:51.168Z",
       "updatedAt":"2024-10-19T16:50:51.168Z",
       "category":{
          "id":1,
          "name":"Electronics",
          "description":"Devices and gadgets"
       }
    },
    {
       "id":8,
       "name":"test",
       "description":null,
       "price":50,
       "stock":200,
       "categoryId":1,
       "images":[
          
       ],
       "createdAt":"2024-10-19T16:50:51.716Z",
       "updatedAt":"2024-10-19T16:50:51.716Z",
       "category":{
          "id":1,
          "name":"Electronics",
          "description":"Devices and gadgets"
       }
    }
  ];

  //products = [...products, ...products, ...products, ...products];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-2xl rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
            <Image
              src={product.images[0] ? `/images/${product.images[0]}` : '/images/placeholder.png'}
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

              <button className="mt-4 bg-teal-700 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded">
                Add to Cart
              </button>

              <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
