import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import "./bookDetails.css";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, SetBook] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/book/books/${id}`).then((response) => {
      SetBook(response.data);
    });
  }, [id]);

  if (!book) return "";

  async function handleDeleteBook(ev){
    ev.preventDefault();
    await axios.delete(`/book/books/${id}`);
    alert('Book is deleted');
    setRedirect(true);
  }
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="bookdetails mx-10 mb-10 px-8 py-8 text-white rounded-3xl">
      <h1 className="text-4xl text-center">{book.title}</h1>

      <div className="mx-8 grid grid cols-1 lg:grid-cols-2">
        <div className="mt-5 flex justify-center lg:justify-start">
          {book.photos?.[0] && (
            <div>
              <img
                className="rounded-3xl"
                src={"http://localhost:8080/uploads/" + book.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="my-14">
          <div className="mt-6">
            <h2 className="font-semibold text-3xl">Author</h2>
            <p className="mt-1">{book.author}</p>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-3xl">Genre</h2>
            <p className="mt-1">{book.genre}</p>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-3xl">Description</h2>
            <p className="mt-1">{book.description}</p>
          </div>
          <div className="books__navbar-sign mt-14 flex justify-between">
            <Link to={`/new/${id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDeleteBook}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
