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
