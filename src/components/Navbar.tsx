import React from "react";

const Navbar = () => {
  return (
    <nav className="border-b-2 shadow-md ">
      <div className="flex justify-between items-center h-14 mx-12">
        <div className="font-semibold">Virtual Try On</div>
        <div className="flex space-x-4">
          <a href="/about">About</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
