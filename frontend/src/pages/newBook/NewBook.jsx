import React, { useEffect, useState } from "react";
import "./newbook.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { PhotosUploader } from "../../components";

const NewBook = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [author, SetAuthor] = useState("");
  const [genre, SetGenre] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() =>{
    if(!id){
      return;
    }
    axios.get(`/books/${id}`).then(response => {
      const {data} = response;
      setTitle(data.title);
      SetAuthor(data.author);
      SetGenre(data.genre);
      setAddedPhotos(data.photos);
      setDescription(data.description);
    })
  },[id]);

  async function addNewBook(ev) {
    ev.preventDefault();
    const booksInfo = {
      title,
      author,
      genre,
      addedPhotos,
      description,
    };
    if(id){
      // update
      await axios.put("/book", {id, ...booksInfo}); 
      setRedirect(true);
    }else{
      // add a new book
      await axios.post("/book", booksInfo); 
      setRedirect(true);
    }
  }

  if(redirect && id){
    return <Navigate to={`/book/${id}`} />
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mx-20">
      <form onSubmit={addNewBook}>
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Title for your book should be short and catchy
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
          placeholder="title, for example: Warmth"
        />

        <h2 className="text-2xl mt-4">Author</h2>
        <p className="text-gray-500 text-sm">
          If there are more than one author seprate is by commas
        </p>
        <input
          type="text"
          value={author}
          onChange={(ev) => {
            SetAuthor(ev.target.value);
          }}
          placeholder="Author of your book is"
        />

        <h2 className="text-2xl mt-4">Genre</h2>
        <p className="text-gray-500 text-sm">Genre is must</p>
        <input
          type="text"
          value={genre}
          onChange={(ev) => {
            SetGenre(ev.target.value);
          }}
          placeholder="for ex- Classic"
        />

        <h2 className="text-2xl mt-4">Cover Photo</h2>
        <p className="text-gray-500 text-sm">
          The one which is enhancing the beauty of your book
        </p>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">Description of the book</p>
        <textarea
          name="bookDescription"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Write something about your book...."
          className="mb-10"
        />

        <div className="text-center">
          <button
            style={{ background: "#FF4820" }}
            className="button bg-gray-200 px-4 rounded-2xl mb-5 "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBook;
