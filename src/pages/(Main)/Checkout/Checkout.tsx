import { products } from "../AllProducts/AllProducts";
import { useState } from "react";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";

const Checkout: React.FC = () => {
  const [cart, setCart] = useState(
    products.slice(0, 3).map((p) => ({ ...p, quantity: 1 }))
  );

  const handleIncrease = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="px-4 py-6 bg-primary min-h-screen text-white flex flex-col items-center">
      <p className="text-2xl font-bold flex items-center gap-2">
        <ShoppingCart size={24} /> Checkout
      </p>
      <section className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mt-6">
        {/* Cart Items */}
        <div className="p-6 rounded-lg w-full lg:w-2/3 bg-white shadow-lg text-primary">
          <div className="flex items-center justify-between border-b pb-3">
            <p className="text-xl font-semibold">Your Cart</p>
            <p className="text-gray-500 text-sm">{totalQuantity} items</p>
          </div>
          <div className="space-y-4 mt-4">
            {cart.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 px-4 text-center sm:text-left">
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-gray-600">₹{product.price} per piece</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="flex items-center rounded-lg">
                    <button
                      className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-l-lg"
                      onClick={() => handleDecrease(product.id)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 text-black">
                      {product.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-r-lg"
                      onClick={() => handleIncrease(product.id)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className=" absolute top-4 right-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 sm:hidden"
                    onClick={() => handleRemove(product.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className=" hidden sm:block px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleRemove(product.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Checkout Summary */}
        <div className="w-full lg:w-1/3 p-5 mt-10 lg:mt-0">
          <div className="bg-white p-6 rounded-2xl shadow-md text-primary">
            <p className="text-xl font-semibold border-b pb-3">Order Summary</p>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Total Quantity</p>
                <p className="font-semibold text-gray-800">{totalQuantity}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold text-green-500">Free</p>
              </div>
              <div className="flex justify-between border-t pt-4">
                <p className="font-semibold text-lg">Total Price</p>
                <p className="font-bold">₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-primary text-white py-3 rounded-full font-semibold hover:bg-teal-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
