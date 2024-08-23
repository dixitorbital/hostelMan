import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AllStudents() {
  const getAll = async () => {
    const data = await getAllStudents();
    console.log(data);
    setallStudents(data.students);
  };

  const [allStudents, setallStudents] = useState([]);

  const deleteStudent = async (id) => {
    const res = await fetch(
      "http://localhost:3000/api/student/delete-student",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await res.json();

    if (data.success) {
      setallStudents(allStudents.filter((student) => student._id !== id));
      toast.success("Student Deleted Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(data.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    getAll();
  }, [allStudents.length]);

  return (
    <div className="w-full bg-white text-gray-600 h-screen pt-20 flex flex-col gap-5 items-center justify-center">
      <h1 className=" font-bold text-5xl">All Students</h1>
      <div className="w-96 flex justify-center">
        {/* <button
          onClick={getCSV}
          target="_blank"
          download={true}
          className="px-20 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xl"
        >
          Download List
        </button> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="bg-gray-100 px-10 py-5 rounded-xl shadow-xl w-[1000px] overflow-auto">
        <span className=" font-bold text-xl my-3 py-3">All Students</span>
        <ul role="list" className="divide-y  divide-gray-700">
          {allStudents.length === 0
            ? "No Students Found"
            : allStudents.map((student) => (
                <li
                  className="py-5 px-5 bg-white shadow-lg my-1 rounded-lg sm:py-4 hover:bg-gray-100  transition-all"
                  key={student._id}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 ">
                      {/* <img src="/noavatar.jpeg" /> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-semibold truncate">
                        {student.name}
                      </p>
                      <p className="text-md truncate text-gray-600">
                        {student.cms_id} | Room No: {student.room_no}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="hover:underline px-1 font-semibold hover:text-green-600 hover:text-lg transition-all">
                        Edit
                      </button>
                      <button
                        className="hover:underline px-1 hover:text-red-500 font-semibold  hover:text-lg transition-all"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Remove
                      </button>
                      <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                      />
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default AllStudents;
