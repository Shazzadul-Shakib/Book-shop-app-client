import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
