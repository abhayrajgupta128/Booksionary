import React from "react";
import Cards from "../card/Cards";
import "./books.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Books = () => {
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    axios.get("/book").then((response) => {
      setBooksData(response.data);
    });
  }, []);

  const [search, setSearch] = useState("");

  const handleSerach = (ev) => {
    setSearch(ev.target.value);
  };

  const filteredBooksData = booksData.filter((book) => {
    const bookName = book.title;
    const bookAuthor = book.author;

    return (
      bookName.toLowerCase().includes(search.toLowerCase()) ||
      bookAuthor.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <div className="books__card section__padding" id="books">
 
          <div className="books__card-heading">
            <h1 className="gradient__text">Our Featured Books</h1>
          </div>

        <div className="books__header-content__input">
            <input
              type="search"
              value={search}
              onChange={handleSerach}
              placeholder="Search your favourite book"
            />
            <button type="button" className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {filteredBooksData.length > 0 &&
            filteredBooksData.map((book, index) => (
              <div key={index} className="flex justify-center">
                <Cards book={book} />
              </div>
            ))}
        </div>
        <div className="books__card-button">
          <button type="button">Load More</button>
        </div>
      </div>
    </>
  );
};

export default Books;
