const AdminBookManagementSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="w-3/4 h-5 bg-gray-200 rounded"></div>{" "}
        {/* Title Skeleton */}
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>{" "}
        {/* Author Skeleton */}
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>{" "}
        {/* Stock Skeleton */}
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>{" "}
        {/* Category Skeleton */}
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>{" "}
        {/* Price Skeleton */}
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>{" "}
        {/* Quantity Skeleton */}
      </div>
      <div className="flex gap-3 mt-4">
        <div className="w-16 h-8 bg-gray-200 rounded"></div>{" "}
        {/* Edit Button Skeleton */}
        <div className="w-16 h-8 bg-gray-200 rounded"></div>{" "}
        {/* Delete Button Skeleton */}
      </div>
    </div>
  );
};

export default AdminBookManagementSkeleton;
