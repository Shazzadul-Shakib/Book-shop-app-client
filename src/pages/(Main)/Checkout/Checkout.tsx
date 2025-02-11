import { useEffect } from "react";
import { useSearchParams } from "react-router"; // ✅ Import for reading URL params
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  clearCart,
  removeItem,
  updateItemQuantity,
} from "../../../redux/features/product/productCartSlice";
import { useCreateOrderMutation } from "../../../redux/features/order/orderSlice";

const Checkout: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.books);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams(); // ✅ Read query params
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const success = searchParams.get("success"); // ✅ Get success param

  useEffect(() => {
    if (success === "true") {
      alert("🎉 Payment Successful! Thank you for your purchase.");
      dispatch(clearCart());
    }
  }, [success, dispatch]);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * Number(item.price),
    0
  );

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const products = cart.map((item) => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  const orderSummery = {
    user: user?._id,
    products,
    totalPrice,
  };

  const handleCreateOrder = async () => {
    try {
      const res = await createOrder(orderSummery).unwrap(); // ✅ Use .unwrap() to handle errors

      if (res?.success && res?.data) {
        console.log("Order created successfully:", res);
        window.location.href = res.data; // ✅ Redirect to the payment URL
      } else {
        console.error("Order creation failed:", res);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

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
            <p className="text-gray-500 text-sm">{cart.length} items</p>
          </div>
          <div className="space-y-4 mt-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="relative flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={product?.image || "/Hero/hero-bg.jpg"}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 px-4 text-center sm:text-left">
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-gray-600">₹{product.price} per piece</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="flex items-center rounded-lg">
                    <button
                      disabled={product.quantity < 1}
                      className="cursor-pointer px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-l-lg"
                      onClick={() =>
                        product.quantity > 0 &&
                        handleUpdateQuantity(product._id, product.quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span className="px-4 py-1 text-black">
                      {product.quantity}
                    </span>
                    <button
                      className="cursor-pointer px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-r-lg"
                      onClick={() =>
                        handleUpdateQuantity(product._id, product.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="cursor-pointer absolute top-4 right-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 sm:hidden"
                    onClick={() => handleRemove(product._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className="cursor-pointer hidden sm:block px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleRemove(product._id)}
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
            <button
              onClick={handleCreateOrder}
              className="cursor-pointer w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-teal-600"
            >
              {isLoading ? "loading" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
