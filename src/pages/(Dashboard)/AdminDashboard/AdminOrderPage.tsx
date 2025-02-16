import AdminOrderView, {
  Order,
} from "../../../components/dashboard/Order/orderViewCardAdmin";
import AdminOrderViewSkeleton from "../../../components/main/skeletons/AdminOrderViewSkeleton";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderSlice";

const AdminOrderPage: React.FC = () => {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);
  const orders: Order[] = data?.data || [];

  return (
    <div className="  mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Order View
      </h2>

      {isLoading ? (
        <div>
          {[...Array(5)].map((_, index) => (
            <AdminOrderViewSkeleton key={index} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <AdminOrderView key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
