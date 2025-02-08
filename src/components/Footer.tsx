import React from "react";

const Footer = () => {
  return (
    <footer className=" mx-8">
      <div className="font-semibold pb-4">Virtual Try On</div>
      <div className="grid grid-cols-2 md:grid-cols-3 text-[#222222] gap-y-1">
        <a href="" className="">
          Collections
        </a>
        <a href="">Contact us</a>
        <a href="">Help</a>
        <a href="">pricing</a>
        <a href="">Socials</a>
        <a href="">FAQs</a>
        <a href="/about">About us</a>
        <a href="/login">Introduction</a>
        <a href="/signup">Security</a>
      </div>
      <div className="text-center mt-8">© 2021 Virtual Try On</div>
    </footer>
  );
};

export default Footer;
