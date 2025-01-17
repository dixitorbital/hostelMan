import { useState } from "react";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const changePassword = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("admin"));

    const data = {
      email: user.email,
      password: oldPass,
      newPassword: pass,
    };

    let result = await fetch("http://localhost:3000/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();

    if (result.success) {
      alert("Password Changed Successfully");
      navigate("/admin-dashboard");
    } else {
      alert(result.errors[0].msg);
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
    <div className="w-full h-screen bg-white pt-10 flex flex-col items-center justify-center">
      <h1 className="text-gray-700 font-bold text-5xl mb-10 text-center">
        Settings
      </h1>
      <form method="POST" onSubmit={changePassword}>
        <div className="w-96 flex flex-col justify-between gap-5 shadow-xl p-5 rounded">
          <h2 className="text-2xl text-gray-600 font-bold mb-5">
            Change Password
          </h2>
          <Input field={chngOldPassField} />
          <Input field={chngPassField} />
          <button
            type="submit"
            className="w-full font-semibold text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600  rounded-lg text-sm px-5 py-2.5 mt-5 text-center"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
