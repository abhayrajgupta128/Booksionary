import React from 'react';
import Cards from '../card/Cards';
import './books.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const Books = () => {

  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    axios.get("/book").then((response) => {
      setBooksData(response.data);
    });
  }, []);
  
  return (
    <> 
      <div className="books__card section__padding" id="books">
        <div className="books__card-heading">
          <h1 className="gradient__text">Our Featured Books</h1>
        </div>
        <div className='books__card-container'>          
          {booksData.length>0 && booksData.map((book,index) => (
            <div key={index}> 
              <Link to={'/book/'+book._id}>
                <Cards
                title={book.title}
                text={book.description}
                imageUrl={"http://localhost:8080/uploads/" + book.photos?.[0]}
                />
                </Link>
              </div>
          ))}
        </div>
        <div className='books__card-button'>
          <button type="button">Load More</button>
        </div>
      </div>
    </>
  );
}

export default Books;
