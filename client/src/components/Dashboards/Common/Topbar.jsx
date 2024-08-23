import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Topbar.propTypes = {
  name: PropTypes.string,
  notifications: PropTypes.array,
};

function Topbar({ name, notifications }) {
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("admin");
    // localStorage.removeItem("hostel");
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };
  const hostel = JSON.parse(localStorage.getItem("hostel")).name;

  return (
    <div className="py-5  flex  justify-between  w-full px-10 rounded-l-full  bg-slate-200 bg-opacity-90 text-gray-600 shadow-lg absolute top-0 md:w-[83.3vw] md:ml-[16.7vw]">
      <div className="font-bold  mx-5 text-[#081a3f] text-start">{hostel}</div>
      <div>
        <div className="flex gap-3">
          <Link to="settings" className=" font-semibold">
            Settings
          </Link>
          <div
            onClick={logout}
            className="relative group cursor-pointer hover:text-red-700 font-semibold"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export { Topbar };
