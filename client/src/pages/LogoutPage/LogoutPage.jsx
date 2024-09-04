import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const LogoutPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready,user, setUser } = useContext(UserContext);
  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="text-center max-w-xl mx-auto text-white">
      Logged in as {user.name} ({user.email}) <br />
      <div className="books__navbar-sign justify-center mt-8 mb-10 block">
      <button onClick={logout} >
        Logout
      </button>
      </div>
    </div>
  );
};

export default LogoutPage;
