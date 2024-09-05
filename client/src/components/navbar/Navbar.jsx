import React, { useContext, useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./navbar.css";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="books__navbar">
      <div className="books__navbar-links z-10">
        <div className="books__navbar-links_logo">
          <Link to={"/"}>
            <img src={images.logo} alt="logo" />
          </Link>
        </div>

        <div className="books__navbar-links_container ">
          <p>
            <Link to={"/"}>Home</Link>
          </p>
          <p>
            <a href="#books">Books</a>
          </p>
          <Link to={"/new"}>
            <div className="books__navbar-add">
              <p>Add new book</p>
            </div>
          </Link>
        </div>
      </div>

      {!!user ? (
        <Link
          to={"/logout"}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ml-4 -mr-10 z-10"
        >
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-white">{user.name}</div>
        </Link>
      ) : (
        <div className="books__navbar-sign user z-10">
          <Link to={"/login"}>
            <p>Sign in</p>
          </Link>
          <Link to={"/register"}>
            <button type="button">Sign up</button>
          </Link>
        </div>
      )}

      <div className="books__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="books__navbar-menu_container scale-up-center">
            <div className="books__navbar-menu_container-links">
              <p>
                <Link to={"/"}>Home</Link>
              </p>
              <p>
                <Link to={"/"}>Books</Link>
              </p>
              <Link to={"/new"}>
                <div className="books__navbar-add">
                  <p>Add new book</p>
                </div>
              </Link>
            </div>
            {!!user ? (
              ""
            ) : (
              <div className="books__navbar-menu_container-links-sign">
                <Link to={"/login"}>
                  <p>Sign in</p>
                </Link>
                <Link to={"/register"}>
                  <button type="button">Sign up</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
