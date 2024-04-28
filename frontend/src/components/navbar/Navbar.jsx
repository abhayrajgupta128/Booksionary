import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./navbar.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="books__navbar">
      <div className="books__navbar-links">
        <div className="books__navbar-links_logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="books__navbar-links_container">
          <p>
            <Link to={"/"}>Home</Link>
          </p>
          <p>
            <a href="#books">Books</a>
          </p>
          <p>
            <a href="#authors">Authors</a>
          </p>
        </div>
      </div>

      <Link to={"/new"}>
        <div className="books__navbar-add">
          <p>Add new book</p>
        </div>
      </Link>

      <div className="books__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>

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
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#books">Books</a>
              </p>
              <p>
                <a href="#authors">Authors</a>
              </p>
            </div>
            <div className="books__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
