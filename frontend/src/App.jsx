import "./App.css";
import { Route, Routes } from "react-router-dom";
import {BookDetails, IndexPage, NewBook} from './pages';
import Layout from "./Layout";
import axios from "axios";

axios.defaults.baseURL = "https://booksionary-api.vercel.app";
// axios.defaults.withCredentials = true;

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
