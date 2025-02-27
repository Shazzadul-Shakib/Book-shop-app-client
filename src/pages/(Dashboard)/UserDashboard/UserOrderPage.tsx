import OrderViewCard from "../../../components/dashboard/Order/OrderViewCard";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useGetSinglePersonsOrdersQuery } from "../../../redux/features/order/orderSlice";
import { useAppSelector } from "../../../redux/hooks";
import OrderViewCardSkeleton from "../../../components/main/skeletons/OrderViewCardSkeleton";
import { IOrder, IProduct } from "../../../types/AllTypes";

const UserOrderPage: React.FC = () => {
  const user = useAppSelector(currentUser);
  const { data, isLoading } = useGetSinglePersonsOrdersQuery(user?._id);

  const orders = data?.data;
  return (
    <div className="min-h-screen overflow-y-auto">
      <p className="text-xl font-semibold mb-4 text-primary">Order History</p>

      {isLoading ? (
        // Show skeleton loading while data is being fetched
        <>
          <OrderViewCardSkeleton />
          <OrderViewCardSkeleton />
          <OrderViewCardSkeleton />
        </>
      ) : orders && orders.length > 0 ? (
        // Render actual OrderViewCards when data is available
        orders.map((order: IOrder) =>
          order.products.map((product: IProduct, index: number) => (
            <OrderViewCard
              key={`${order._id}-${index}`}
              title={product?.productId?.title}
              orderDate={new Date(order.createdAt).toLocaleDateString()}
              paymentStatus={order?.status}
              image={product?.productId?.image}
            />
          ))
        )
      ) : (
        // Show a message if there are no orders
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
          <p className="text-gray-500">
            Start shopping to see your orders here!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;
