import { useNavigate, useParams } from "react-router";

const products = [
  {
    id: 1,
    name: "Book One",
    author: "Author A",
    price: 25,
    category: "Fiction",
    available: true,
    image: "https://via.placeholder.com/300",
    description: "A great fiction book to read.",
  },
  {
    id: 2,
    name: "Book Two",
    author: "Author B",
    price: 30,
    category: "Non-Fiction",
    available: false,
    image: "https://via.placeholder.com/300",
    description: "A deep dive into non-fiction.",
  },
  {
    id: 3,
    name: "Book Three",
    author: "Author C",
    price: 20,
    category: "Mystery",
    available: true,
    image: "https://via.placeholder.com/300",
    description: "A thrilling mystery novel.",
  },
  {
    id: 4,
    name: "Book Four",
    author: "Author D",
    price: 35,
    category: "Sci-Fi",
    available: true,
    image: "https://via.placeholder.com/300",
    description: "An exciting sci-fi adventure.",
  },
  {
    id: 5,
    name: "Book Five",
    author: "Author E",
    price: 40,
    category: "Biography",
    available: false,
    image: "https://via.placeholder.com/300",
    description: "The life story of a remarkable person.",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">Author: {product.author}</p>
        <p className="text-gray-600">Category: {product.category}</p>
        <p className="text-gray-800 font-bold text-xl">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p
          className={
            product.available ? "text-green-600 mt-2" : "text-red-600 mt-2"
          }
        >
          {product.available ? "In Stock" : "Out of Stock"}
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={!product.available}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
