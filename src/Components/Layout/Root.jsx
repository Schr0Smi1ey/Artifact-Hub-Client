import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { useContext } from "react";
import { BounceLoader } from "react-spinners";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BounceLoader color="#fb9c28" size={110} />
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden">
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
