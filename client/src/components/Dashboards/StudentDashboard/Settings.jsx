import { useState } from "react";
import { Input } from "./Input.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const navigate = useNavigate();
  const changePassword = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("student"));

    const data = {
      email: user.email,
      password: oldPass,
      newPassword: pass,
    };
    console.log(data);
    let result = await fetch("http://localhost:3000/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();

    // const result = await axios.post(
    //   "http://localhost:3000/api/auth/change-password",
    //   data
    // );
    console.log("result", result);

    if (result.success) {
      navigate("/student-dashboard");
    } else {
      toast.error("this error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const [pass, setPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const chngPassField = {
    name: "New Password",
    type: "password",
    placeholder: "New Password",
    req: true,
    onChange: chngPass,
    value: pass,
  };
  const chngOldPassField = {
    name: "Old Password",
    type: "password",
    placeholder: "Old Password",
    req: true,
    onChange: chngOldPass,
    value: oldPass,
  };

  function chngPass(e) {
    setPass(e.target.value);
  }

  function chngOldPass(e) {
    setOldPass(e.target.value);
  }

  return (
    <div className="w-full bg-white text-gray-600 h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className=" font-bold text-3xl mb-10 text-center">Settings</h1>
      <form method="POST" onSubmit={changePassword}>
        <div className="w-96 flex flex-col justify-between gap-5 bg-gray-100 drop-shadow-lg  text-gray-600 p-5 rounded">
          <h2 className="text-3xl  font-bold mb-5">Change Password</h2>
          <Input field={chngOldPassField} />
          <Input field={chngPassField} />
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center"
          >
            Change Password
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
    </div>
  );
}

export default Settings;
