const AdminOrderViewSkeleton: React.FC = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-4 bg-gray-100">
        <div className="flex flex-col flex-1 space-y-3">
          <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
        </div>
        <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default AdminOrderViewSkeleton;
