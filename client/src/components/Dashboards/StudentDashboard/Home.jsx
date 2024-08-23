import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

function Home() {
  let student = JSON.parse(localStorage.getItem("student"));

  const getAttendance = async () => {
    let student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) {
      let daysOff = 0;
      data.attendance.map((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
      });
      setDaysOff(daysOff);
      console.log(daysOff);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const labels = ["Days off", "Days present"];
  let totalDays = new Date();
  totalDays = totalDays.getDate();
  const [daysOff, setDaysOff] = useState(0); //!Fetch from database

  return (
    <div className="w-full h-screen flex bg-white text-gray-600 items-center justify-center flex-col gap-10 max-h-screen overflow-y-auto pt-64 lg:pt-0 md:pt-64 sm:pt-96">
      <h1 className=" font-bold text-5xl text-center">
        Welcome <span className="text-gray-800">{student.name}</span>
      </h1>
      <div className="flex gap-10  w-full justify-center flex-wrap">
        {/* <List /> */}
        <div className="flex flex-col px-5 py-10 font-semibold h-[250px] drop-shadow-xl rounded-md mt-14  bg-gray-100 w-[400px]">
          <span className="text-gray-700 text-center text-xl mb-10 font-bold">
            Student Profile
          </span>
          <p>
            <span className="text-gray-700 p-5 my-5 font-bold">Name :</span>{" "}
            {student.name}{" "}
          </p>
          <p>
            <span className="text-gray-700 p-5 my-5 font-bold">Email :</span>{" "}
            {student.email}{" "}
          </p>
          <p>
            <span className="text-gray-700 p-5 my-5 font-bold">Roll No :</span>{" "}
            {student.cms_id}{" "}
          </p>

          <p>
            <span className="text-gray-700 p-5 my-5 font-bold">Room No :</span>{" "}
            {student.room_no}{" "}
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 rounded-xl shadow-xl p-5">
          <span className="text-xl">Attendance</span>
          <Doughnut
            datasetIdKey="id"
            data={{
              labels,
              datasets: [
                {
                  label: "days",
                  data: [daysOff, totalDays - daysOff],
                  backgroundColor: ["#F26916", "#1D4ED8"],
                  barThickness: 50,
                  borderColor: "rgba(0,0,0,0)",
                  hoverOffset: 10,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
