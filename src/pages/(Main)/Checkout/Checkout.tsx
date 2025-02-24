import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  clearCart,
  removeItem,
  updateItemQuantity,
} from "../../../redux/features/product/productCartSlice";
import { useCreateOrderMutation } from "../../../redux/features/order/orderSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/main/shared/Spinner";

const Checkout: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.books);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "true") {
      toast.success("Payment successful");
      dispatch(clearCart());
    }
  }, [success, dispatch]);

  const totalQuantity = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );
  const totalPrice = cart.reduce(
    (total, item) => total + item.cartQuantity * Number(item.price),
    0
  );

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: string, cartQuantity: number) => {
    dispatch(updateItemQuantity({ id, cartQuantity }));
  };

  const products = cart.map((item) => ({
    productId: item._id,
    quantity: item.cartQuantity,
  }));

  const orderSummery = {
    user: user?._id,
    products,
    totalPrice,
  };

  const handleCreateOrder = async () => {
    try {
      const res = await createOrder(orderSummery).unwrap();
      if (res?.success && res?.data) {
        window.location.href = res.data;
        toast.success("Order created successfully");
      } else {
        console.error("Order creation failed:", res);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="px-4 py-6 bg-primary min-h-screen text-white flex flex-col items-center">
      <p className="text-2xl font-bold flex items-center gap-2">
        <ShoppingCart size={24} /> Checkout
      </p>

      {/* Conditional rendering for empty cart */}
      {cart.length === 0 ? (
        <div className="w-full max-w-md mx-auto text-center mt-6">
          <p className="text-xl font-semibold text-gray-800">
            Your cart is empty. Please add some items to proceed.
          </p>
          <button
            className="mt-4 bg-primary text-white px-5 cursor-pointer py-3 rounded-lg hover:bg-teal-600"
            onClick={() => navigate("/products")} // Use navigate for redirection
          >
            Go to Shop
          </button>
        </div>
      ) : (
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
                        disabled={product.cartQuantity === 1}
                        className={` px-3 py-1 rounded-l-lg ${
                          product.cartQuantity === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        }`}
                        onClick={() =>
                          product.cartQuantity > 1 &&
                          handleUpdateQuantity(
                            product._id,
                            product.cartQuantity - 1
                          )
                        }
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-4 py-1 text-black">
                        {product.cartQuantity}
                      </span>

                      <button
                        disabled={product.cartQuantity === product.quantity}
                        className={` px-3 py-1 rounded-r-lg ${
                          product.cartQuantity === product.quantity
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        }`}
                        onClick={() =>
                          handleUpdateQuantity(
                            product._id,
                            product.cartQuantity + 1
                          )
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
              <p className="text-xl font-semibold border-b pb-3">
                Order Summary
              </p>
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
                {isLoading ? (
                  <LoadingSpinner/>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Checkout;
