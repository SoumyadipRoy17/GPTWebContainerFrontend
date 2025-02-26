// Import necessary dependencies
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";

import { UserContext } from "../context/user.context";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    axios
      .post("/users/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-600 rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-600 rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log in to account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
