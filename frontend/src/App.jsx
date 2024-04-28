import "./App.css";
import { Route, Routes } from "react-router-dom";
import BookDetails from "./pages/bookDetails/BookDetails";
import Layout from "./Layout";
import IndexPage from "./pages/indexpage/IndexPage";
import NewBook from "./pages/newBook/NewBook";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/new" element={<NewBook />} />
          <Route path="/new/:id" element={<NewBook />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
