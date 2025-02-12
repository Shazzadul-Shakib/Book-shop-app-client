interface OrderViewCardProps {
  image?: string;
  title: string;
  orderDate?: string;
  paymentStatus: "pending" | "success" | "cancelled";
}

const OrderViewCard: React.FC<OrderViewCardProps> = ({
  image,
  title,
  orderDate,
  paymentStatus,
}) => {
  // Determine the payment status color
  const getPaymentStatusColor = () => {
    switch (paymentStatus) {
      case "pending":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex mb-4 items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={image || "Hero/hero-bg.jpg"}
          alt={title || "hello"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {title || "Hello"}
        </h3>
        <p className="text-sm text-gray-500">
          Order Date: {orderDate || "12-02-2025"}
        </p>
      </div>

      {/* Payment Status */}
      <div className="ml-4">
        <span
          className={`px-3 py-2 text-sm flex items-center justify-center font-semibold text-white rounded-full ${getPaymentStatusColor()}`}
        >
          {paymentStatus || "success"}
        </span>
      </div>
    </div>
  );
};

export default OrderViewCard;
