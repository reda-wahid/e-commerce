import Home from "../../Pages/Home";
import Header from "../../Components/Header/Hedear";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  return (
    <>
    <Header/>
    <Outlet/>
    <ToastContainer />
    <Footer />
    </>
  );
}
