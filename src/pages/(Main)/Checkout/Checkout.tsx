import { useState } from "react";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: 1,
    name: "Book One",
    price: 25,
    stock: 5,
    image: "https://via.placeholder.com/300",
  };

  const totalPrice = quantity * product.price;

  const handleOrder = () => {
    if (quantity > product.stock) {
      alert("Quantity exceeds available stock");
      return;
    }
    // Payment Integration with SurjoPay (Mockup for now)
    alert("Redirecting to SurjoPay for payment...");
    navigate("/order-confirmation");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md my-4"
        />
        <p className="text-gray-600">{product.name}</p>
        <p className="text-gray-800 font-bold text-xl">${product.price}</p>
        <label className="block mt-4 text-gray-700">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.max(1, Math.min(product.stock, Number(e.target.value)))
            )
          }
          className="w-full p-2 border rounded-md"
        />
        <p className="mt-2 text-gray-700">
          Total: <span className="font-bold">${totalPrice}</span>
        </p>
        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
