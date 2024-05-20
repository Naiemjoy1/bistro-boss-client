import React from "react";

const Footer = () => {
  return (
    <div>
      <section className="flex justify-center items-center text-white bg-[#1F2937] p-20">
        <div className=" w-full">
          <p>Contact us</p>
          <p>123 ABC Street, Uni 21, Bangladesh</p>
          <p>+88 012 3456 7891</p>
          <p>Contact us</p>
        </div>
        <div className=" w-full">
          <p>Follow US</p>
        </div>
      </section>
      <section className=" bg-black text-center text-white py-5">
        <p>Copyright © CulinaryCloud. All rights reserved</p>
      </section>
    </div>
  );
};

export default Footer;
