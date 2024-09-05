import "./App.css";
import { Route, Routes } from "react-router-dom";
import {BookDetails, IndexPage, NewBook} from './pages';
import Layout from "./Layout";
import axios from "axios";
import ResgisterPage from "./pages/RegisterPage/ResgisterPage";
import LoginPage from "./pages/Loginpage/LoginPage";
import { UserContextProvider } from "./UserContext";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import { Toaster } from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <UserContextProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/api/books/:id" element={<BookDetails />} />
          <Route path="/api/books" element={<NewBook />} />
          <Route path="/api/books/:id" element={<NewBook />} />
          <Route path="/api/register" element={<ResgisterPage />} />
          <Route path="/api/login" element={<LoginPage />} />
          <Route path="/api/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
