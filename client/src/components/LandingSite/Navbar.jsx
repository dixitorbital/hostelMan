import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuStyles = `flex-col sticky top-0 left-0 w-full  h-full bg-gray px-10 bg-black py-40 text-5xl font-bold`;
  return (
    <div className=" top-0 left-0  sticky flex h-full items-center text-lg overflow-hidden font-semibold justify-between px-10 py-3 bg-gray-200 bg-opacity-95  text-gray-800 ">
      <Link to="/" className="flex z-10 md:py-3 font-bold text-2xl lg:text-4xl">
        hostelMan
        <p className=" text-green-500 flext items-end text-4xl">.</p>
      </Link>
      <div
        className={`flex ${
          menuOpen ? mobileMenuStyles : "hidden"
        } gap-10 md:flex`}
      >
        <Link
          to="/about"
          className="md:py-3 md:hover:text-blue-500 transition-all ease-linear"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="md:py-3 md:hover:text-blue-500 transition-all ease-linear"
        >
          Contact
        </Link>
        <Link
          to="/auth/admin-login"
          className="md:py-3 md:hover:text-blue-500 transition-all ease-linear"
        >
          Admin
        </Link>
        <Link
          to="/auth/login"
          className={`bg-blue-500   py-3  rounded-lg text-white px-4 text-center hover:bg-blue-700 transition md:text-white font-semibold ${
            menuOpen ? "text-blue-500" : ""
          }`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
export { Navbar };
