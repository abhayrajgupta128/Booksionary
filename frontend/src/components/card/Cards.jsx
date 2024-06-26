import React from "react";
import Button from "react-bootstrap/Button";
import "./cards.css";
import { Link } from "react-router-dom";

const Cards = ({ book }) => {
  return (
    <Link to={"/book/" + book._id}>
      <div className="books-container_card">
        <div className="books-container_card-image">
          <img
            src={"http://localhost:8080/uploads/" + book.photos?.[0]}
            alt="image"
          />
        </div>

        <div className="books-container_card-content">
          <div className="books-container_card-title">{book.title}</div>
          <div className="books-container_card-text">{book.description}</div>
          <Button variant="primary">Read More</Button>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
