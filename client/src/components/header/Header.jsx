import "./header.css";
import { images } from "../../constants";

const Header = () => {
  return (
    <div className="books__header section__padding" id="home">
      <div className="books__header-content">
        <h1 className="gradient__text">
          "Explore Our Vast Library & Discover Your Favorite Book"
        </h1>
        <p>
        Welcome to Booksionary, where endless adventures await between the pages of a book. Whether you're seeking thrilling mysteries, heartwarming romances, or thought-provoking non-fiction, our vast library has something for everyone. Dive into captivating stories, explore new worlds, and embark on unforgettable journeys—all from the comfort of your own imagination !!
        </p>

      </div>

      <div className="books__header-image">
        <img src={images.book} alt="book" />
      </div>
    </div>
  );
};

export default Header;
