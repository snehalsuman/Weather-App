import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;