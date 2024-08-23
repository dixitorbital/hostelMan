import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
  const [loading, setLoading] = useState(false);

  const registerComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);
    let student = JSON.parse(localStorage.getItem("student"));
    const complaint = {
      student: student._id,
      hostel: student.hostel,
      title: title,
      description: desc,
      type: type,
    };

    const res = await fetch("http://localhost:3000/api/complaint/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    });

    const data = await res.json();

    if (data.success) {
      setRegComplaints([]);
      toast.success("Complaint Registered Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTitle("");
      setDesc("");
      setType("Electric");
    } else {
      toast.error(data.errors, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoading(false);
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Electric");

  const types = ["Electric", "Mess", "Cleaning", "Furniture", "Others"];

  function chngType(e) {
    setType(e.target.value);
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }

  const complaintTitle = {
    name: "complaint title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };
  const complaintType = {
    name: "complaint type",
    placeholder: "Type...",
    req: true,
    type: "text",
    value: type,
    onChange: chngType,
  };

  const [regComplaints, setRegComplaints] = useState([]);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    const cmpln = { student: student._id };
    const fetchComplaints = async () => {
      const res = await fetch("http://localhost:3000/api/complaint/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cmpln),
      });
      const data = await res.json();
      // let complaints = data.complaints;
      // complaints = complaints.map((complaint) => {
      //   var date = new Date(complaint.date);
      //   complaint.date = date.toLocaleDateString("en-US", {
      //     day: "numeric",
      //     month: "long",
      //     year: "numeric",
      //   });
      //   return {
      //     title: complaint.title,
      //     status: complaint.status,
      //     date: complaint.date,
      //     type: complaint.type,
      //   };
      // });
      setRegComplaints(data.complaints);
    };
    fetchComplaints();
  }, [regComplaints.length]);

  return (
    <div className="w-full h-screen flex flex-col gap-10 bg-white text-gray-600 items-center justify-center md:p-0 px-10 max-h-screen overflow-y-auto pt-80 md:pt-80 lg:p-0">
      <h1 className="font-bold text-3xl mt-10">Complaints</h1>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        <form
          method="POST"
          onSubmit={registerComplaint}
          className="md:w-96 w-full py-5 pb-7 px-10 bg-gray-100 rounded-lg shadow-xl flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium "
            >
              Your complaint type
            </label>
            <select
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white hover:bg-gray-100 border-gray-300 placeholder-white focus:ring-gray-500 focus:border-gray-500 outline-none"
              onChange={chngType}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {type.toLowerCase() === "electric" ||
            type.toLowerCase() === "furniture" ||
            type.toLowerCase() === "cleaning" ||
            type.toLowerCase() === "mess" ? (
              <></>
            ) : (
              <div className="mt-5">
                <Input field={complaintType} />
              </div>
            )}
          </div>
          <Input field={complaintTitle} />
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium "
            >
              Your complaint description
            </label>
            <textarea
              name="description"
              placeholder="Details of complaint"
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300  focus:ring-gray-500 focus:border-gray-500 outline-none"
              onChange={descChange}
              value={desc}
            ></textarea>
            <button
              type="submit"
              className="w-full text-white bg-gray-800  hover:bg-gray-700 focus:ring-4 font-semibold text-lg rounded-lg px-5 py-2 mt-5 text-center"
              disabled={loading}
            >
              {loading ? "Registering Complaint..." : "Register Complaint"}
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
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
        </form>
        <div className="w-full md:w-80 max-w-md max-h-96 border rounded-lg p-5 m-3 bg-gray-100 text-gray-600 drop-shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none ">
              Registered Complaints
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-700 ">
              {regComplaints.length === 0
                ? "No complaints registered"
                : regComplaints.map((complain) => (
                    <li className="py-3 sm:py-4" key={complain.title}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {complain.status.toLowerCase() === "pending" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-7 h-7"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate ">
                            {complain.title}
                          </p>
                          <p className="text-sm truncate text-gray-400">
                            {complain.date}
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-base font-semibold ">
                          {complain.type}
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
