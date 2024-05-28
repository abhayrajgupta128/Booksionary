import "./App.css";
import { Route, Routes } from "react-router-dom";
import {BookDetails, IndexPage, NewBook} from './pages';
import Layout from "./Layout";
import axios from "axios";
import ResgisterPage from "./pages/RegisterPage/ResgisterPage";
import LoginPage from "./pages/Loginpage/LoginPage";
import { UserContextProvider } from "./UserContext";
import LogoutPage from "./pages/LogoutPage/LogoutPage";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/new" element={<NewBook />} />
          <Route path="/new/:id" element={<NewBook />} />
          <Route path="/register" element={<ResgisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
