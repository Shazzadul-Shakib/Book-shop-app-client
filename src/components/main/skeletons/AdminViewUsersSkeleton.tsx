const AdminViewUsersSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg animate-pulse bg-gray-200">
      <div>
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-48 bg-gray-300 rounded"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-6 w-6 bg-gray-300 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default AdminViewUsersSkeleton;
