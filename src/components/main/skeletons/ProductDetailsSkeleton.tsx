const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl animate-pulse">
        <div className="w-full h-64 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-8 bg-gray-300 rounded-md w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded-md w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded-md w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-2/3 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
        <div className="mt-6 w-full h-12 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
