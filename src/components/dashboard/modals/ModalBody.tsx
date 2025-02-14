import React from "react";

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 ">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ModalBody;
