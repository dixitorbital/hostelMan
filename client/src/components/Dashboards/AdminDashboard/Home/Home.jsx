import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const [refund, setRefund] = useState(0);

  // console.log(admin, hostel);

  const getRequests = async () => {
    const res = await fetch("http://localhost:3000/api/messoff/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });

    const data = await res.json();
    console.log("data", data);
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        // req.student.name = req.student.name;
        // req.student.room_no = req.student.room_no;
        // req.status = req.status;
        (req.title = `${req.student.name} [ Room: ${req.student.room_no}]`),
          (req.desc = `${req.from} to ${req.to}`);
      });
      setMessReqs(data.list);
      console.log(messReqs);
    }
  };
  const getRefund = async () => {
    const res = await fetch("http://localhost:3000/api/messoff/refund", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("refund :", data);
    setRefund(data.days);
  };

  useEffect(() => {
    getRequests();
    getRefund();
  }, []);

  const [messReqs, setMessReqs] = useState([]);
  console.log("messreq", messReqs);

  const messIcon = (
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
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );

  return (
    <div className="w-full h-screen text-gray-500  bg-white flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className=" font-bold text-5xl text-center">
        Welcome <span className="text-gray-800">{admin.name || "Admin"}</span>
      </h1>
      <h1 className="text-white text-xl">Manager, {hostel.name || "hostel"}</h1>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={4} />
        <ShortCard title="Total Complaints" number={3} />
        <ShortCard title="Refund" number={`${(refund * 300) / 1000}k`} />
      </div>
      <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        <List list={messReqs} title="mess" icon={messIcon} />
      </div>
    </div>
  );
}

export default Home;
