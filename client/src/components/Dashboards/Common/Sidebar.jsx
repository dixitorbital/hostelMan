import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CiLogout } from "react-icons/ci";
// import { SlHome } from "react-icons/sl";
Sidebar.propTypes = {
  links: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    for: PropTypes.string.isRequired,
    svg: PropTypes.element.isRequired,
  }).isRequired,
};

function Sidebar({ links }) {
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("admin");
    // localStorage.removeItem("hostel");
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
  }, []);

  return (
    <div>
      <button
        className={`fixed flex gap-2 md:hidden z-50 top-[6rem] left-20 md:left-20 ml-10 bg-black p-1 w-50 h-50 rounded-full shadow-lg text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-20" : "-translate-x-20"
        }`}
        onClick={toggleMenu}
      >
        <svg
          className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
        <svg
          className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className={`flex flex-col justify-between h-screen w-screen absolute md:static sm:w-64 bg-gray-200 shadow-lg text-gray-800 font-semibold transition-transform duration-300 ease-in-out z-40 transform ${
          isOpen ? "translate-x-0" : "absolute -translate-x-full"
        }`}
      >
        <Link
          to={`/`}
          className="py-4 px-4 md:py-5 lg:py-4 gap-2 bg-gray-700 flex text-white  justify-center items-center text-2xl"
        >
          <span className="md:hidden lg:inline">Dashboard</span>
        </Link>
        <div className="flex flex-col space-y-1 text-2xl text-gray-900 bg-gray-200 justify-center items-start pl-5">
          {links.map((link) => (
            <Link
              to={link.url}
              key={link.text}
              className={`py-2 px-4 flex items-center gap-2 ${
                location.pathname === link.url
                  ? "text-gray-400"
                  : "hover:text-gray-500"
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="p-4">
          <button
            onClick={logout}
            type="submit"
            className="w-full flex gap-2 justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <CiLogout size={25} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
