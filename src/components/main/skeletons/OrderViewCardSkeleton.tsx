
const OrderViewCardSkeleton: React.FC = () => {
  return (
    <div className="flex mb-4 items-center p-4 border rounded-lg shadow-sm animate-pulse">
      {/* Product Image Skeleton */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-300 rounded-lg"></div>

      {/* Product Details Skeleton */}
      <div className="ml-4 flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Payment Status Skeleton */}
      <div className="ml-4">
        <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default OrderViewCardSkeleton;
