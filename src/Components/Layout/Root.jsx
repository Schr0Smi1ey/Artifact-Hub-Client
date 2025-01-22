import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { useContext } from "react";
import { HashLoader } from "react-spinners";

const Root = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <HashLoader color="#387478" size={110} />
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden">
      <Navbar></Navbar>
      <div className="my-32">
        <Outlet></Outlet>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Root;
