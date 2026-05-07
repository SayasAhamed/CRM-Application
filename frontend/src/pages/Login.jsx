import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await login({
        email,
        password,
      });

      if (res.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );

        navigate("/dashboard");

      } else {

        alert("Invalid email or password");

      }

    } catch (err) {

      console.log(err);

      alert("Login failed");

    }
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center px-4 bg-gray-950">

      <div className="w-full max-w-md p-8 bg-gray-800 shadow-2xl rounded-3xl">

        <h1 className="mb-8 text-4xl font-extrabold text-center text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="admin@example.com"
          className="w-full p-4 mb-5 text-white transition bg-gray-700 outline-none rounded-2xl focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-4 mb-6 text-white transition bg-gray-700 outline-none rounded-2xl focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full p-4 text-lg font-bold text-white transition bg-blue-600 rounded-2xl hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>
  );
}