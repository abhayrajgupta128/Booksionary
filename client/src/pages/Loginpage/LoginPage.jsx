import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../UserContext';
import toast from 'react-hot-toast';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      toast.success("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className='mt-4 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
    <div className="mb-64">
      <h1 className="text-4xl text-center mb-4 text-white">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            <button type="submit">Sign In</button>
          </div>
        <div className="text-center py-2 text-gray-500">
          Dont't have an account yet?
          <Link className="underline text-white" to={"/register"}>
            Register now
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginPage
