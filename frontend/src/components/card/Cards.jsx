import React from "react";
import Button from "react-bootstrap/Button";
import "./cards.css";

const Cards = ({ title, text, imageUrl }) => {
  return (
    <div className="books-container_card">
      <div className="books-container_card-image">
        <img src={imageUrl} alt="image" />
      </div>

      <div className="books-container_card-content">
        <div className="books-container_card-title">{title}</div>
        <div className="books-container_card-text">{text}</div>
        <Button variant="primary">Read More</Button>
      </div>
    </div>
  );
};

export default Cards;
