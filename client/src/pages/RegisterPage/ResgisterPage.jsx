import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResgisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      toast.success("Registration succesfull");
      setRedirect("/login");
    } catch (e) {
      alert("Registration failed, Please try again later");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-4 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 text-white">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className="books__navbar-sign justify-center mt-2">
            <button type="submit">Register</button>
          </div>

          <div className="text-center py-2 text-gray-500">
            Already a member? 
            <Link className="underline text-white" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResgisterPage;
