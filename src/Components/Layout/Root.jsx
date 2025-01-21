import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
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
