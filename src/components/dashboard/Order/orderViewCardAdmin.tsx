import { Trash2 } from "lucide-react";
import { useDeleteSigleOrderMutation } from "../../../redux/features/order/orderSlice";
import LoadingSpinner from "../../main/shared/Spinner";

export interface Order {
  _id: string;
  user: { _id: string; name: string } | null;
  products: { productId: { _id: string; title: string }; quantity: number }[];
  totalPrice: number;
  transactionId: string;
  status: "pending" | "success" | "cancelled";
  createdAt: string;
}

const AdminOrderView: React.FC<{ order: Order }> = ({ order }) => {
  const [deleteSigleOrder, { isLoading }] = useDeleteSigleOrderMutation();
  const handleDelete = async (orderId: string) => {
    const result = await deleteSigleOrder(orderId);
    if ("data" in result) {
      alert(result.data.message);
    } else if ("error" in result) {
      alert("Failed to delete order");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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
    <div className="my-4">
      <div
        key={order?._id}
        className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col flex-1">
          <p className="text-lg font-semibold">
            Transaction ID: {order?.transactionId}
          </p>
          <p className="text-sm text-gray-600">
            User: {order?.user ? order?.user?.name : "Guest"}
          </p>
          <p className="text-sm text-gray-600">
            Total Price: ${order?.totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Order Date: {new Date(order?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">Products:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {order.products.map((product) => (
              <li key={product?.productId?._id}>
                {product?.productId?.title} (x{product?.quantity})
              </li>
            ))}
          </ul>
        </div>
        <span
          className={`px-3 py-2 text-sm font-semibold text-white rounded-full ${getStatusColor(
            order?.status
          )}`}
        >
          {order?.status}
        </span>
        <button
          onClick={() => handleDelete(order?._id)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          {isLoading ? <LoadingSpinner /> : <Trash2 size={20} />}
        </button>
      </div>
    </div>
  );
};

export default AdminOrderView;
