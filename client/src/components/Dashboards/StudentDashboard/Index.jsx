import { Outlet } from "react-router-dom";
import { Sidebar } from "../Common/Sidebar";
import { Topbar } from "../Common/Topbar";

export default function Index() {
  const dashboard = "student";
  const links = [
    {
      text: "Home",
      url: "/student-dashboard",
      for: dashboard,
    },
    {
      text: "Mess Off",
      url: "/student-dashboard/mess",
    },
    {
      text: "Attendance",
      url: "/student-dashboard/attendance",
    },
    {
      text: "Complaints",
      url: "/student-dashboard/complaints",
    },
  ];

  const student = JSON.parse(localStorage.getItem("student"));

  return (
    <div className="flex">
      <Sidebar links={links} />
      <Topbar name={student.name} notifications={[]} />
      <div className="w-full bg-stone-900 h-screen">
        <Outlet />
      </div>
    </div>
  );
}
