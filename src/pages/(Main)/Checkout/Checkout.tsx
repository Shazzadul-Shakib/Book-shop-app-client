import { products } from "../AllProducts/AllProducts";

const Checkout: React.FC = () => {
  return (
    <div className="px-10 py-6 bg-primary min-h-screen text-white">
      <p className=" text-lg font-semibold">Checkout</p>
      {/* Checkout section */}
      <section className=" flex">
        {/* Cart Items */}
        <div className=" p-5 rounded w-2/3">
          {/* Cart header */}
          <div className=" flex items-center gap-6 mb-4 justify-between">
            <div>
              <p>Cart</p>
            </div>
            <div>
              <p className=" text-xs">3 items</p>
            </div>
          </div>
          {/* cart cards */}
          <div className=" space-y-2">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg w-full"
              >
                {/* Left Side - Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Middle Section - Name & Price */}
                <div className="flex-1 px-4 ">
                  <p className="text-lg font-semibold text-primary">
                    {product.name}
                  </p>
                  <p className="text-gray-600">₹{product.price} per piece</p>
                </div>

                {/* Right Side - Quantity Controls & Remove */}
                <div className="flex items-center gap-4">
                  {/* Quantity Section */}
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="px-3 py-1 bg-gray-500 rounded-l-lg hover:bg-gray-700"
                      // onClick={() => onDecrease(product.id)}
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-black">0</span>
                    <button
                      className="px-3 py-1 bg-gray-500 rounded-r-lg hover:bg-gray-700"
                      // onClick={() => onIncrease(product.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove from Cart Button */}
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                    // onClick={() => onRemove(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Cart chekout */}
        <div className=" w-1/3 p-5 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full mx-auto">
            {/* Price Summary */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal (1 item)</p>
                <p className="font-semibold text-gray-800">SAR 40.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold text-green-500">Free</p>
              </div>
              <div className="flex justify-between border-t pt-4">
                <p className="font-semibold text-lg text-gray-800">
                  Total (with VAT)
                </p>
                <p className="font-bold text-gray-800">SAR 330.00</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex justify-center gap-4 my-4">
              <img
                src="/visa-icon.png"
                alt="Visa"
                className="w-10 h-6 object-contain"
              />
              <img
                src="/mastercard-icon.png"
                alt="Mastercard"
                className="w-10 h-6 object-contain"
              />
              <img
                src="/mada-icon.png"
                alt="Mada"
                className="w-10 h-6 object-contain"
              />
              <p className="text-gray-600 font-medium">Cash</p>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-primary text-white py-3 rounded-full text-lg font-semibold hover:bg-teal-600">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
