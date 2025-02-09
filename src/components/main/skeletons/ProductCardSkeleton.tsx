const ProductCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-lg animate-pulse">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-300 h-[200px] w-full"></div>
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-5 w-1/2 bg-gray-300 rounded mb-2"></div>
      <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-5 w-1/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-5 w-1/4 bg-green-300 rounded mb-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded"></div>
    </div>
  );
};

export default ProductCardSkeleton;
