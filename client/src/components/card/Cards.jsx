import React from "react";
import Button from "react-bootstrap/Button";
import "./cards.css";
import { Link } from "react-router-dom";
import Image from "../image/Image";

const Cards = ({ book }) => {
  return (
    <Link to={"/books/" + book._id}>
      <div className="books-container_card">
        <div className="books-container_card-image">
          <Image src={book.photos?.[0]} alt="image" />
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
