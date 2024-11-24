import React from "react";

const ErrorScreen = () => {
  return (
    <div className="bg-gradient-to-t from-sky-300  to-cyan-800 pt-32 pb-32 min-h-150 px-10">
      <h1 className="sm:text-3xl  text-xl font-gothic text-center mb-10 text-black md:text-5xl mt-80">
        Game is updating !
      </h1>
      <p className="max-w-150 text-center mx-auto  text-xs md:text-lg font-medium mb-28 text-gray-900">
        Try Again Later...
      </p>
    </div>
  );
};

export default ErrorScreen;
