import { Link } from "react-router-dom";
import PropTypes from "prop-types";

List.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  addClasses: PropTypes.string,
  icon: PropTypes.element.isRequired,
};

function List({ list, title, icon, addClasses }) {
  return (
    <div
      className={`bg-white px-7 py-5 text-gray-600 rounded-xl shadow-xl w-full md:max-w-[350px] max-h-96  ${addClasses}`}
    >
      <div className="flex flex-col justify-between h-full">
        <span className="text-gray-600 font-bold text-xl ml-3">
          New Requests
        </span>
        <ul className="divide-y h-[180px] divide-gray-700 overflow-auto overflow-x-hidden text-gray-600">
          {list.length === 0 ? (
            <li className="mt-2 pl-3 mb-5">No new {title}</li>
          ) : (
            list.map((item) => (
              <li
                className="group py-3 pl-3 rounded sm:py-4 hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                key={item.id}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-gray-700">
                      {item.title}
                    </p>
                    <p className="text-sm truncate text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <Link
          className="py-2 text-lg text-center text-white mt-5  bg-gray-800 rounded-lg w-full font-semibold border-gray-800 border-2 hover:bg-gray-700 hover:traslate-y-2"
          to={title}
        >
          Manage {title}
        </Link>
      </div>
    </div>
  );
}

export { List };
