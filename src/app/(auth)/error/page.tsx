import React from "react";

const AuthErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center justify-center h-[20%] w-[70%]">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-center text-zinc-400f mb-8">
            Error
          </h1>
          <p>Something went wrong. Please try again.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
