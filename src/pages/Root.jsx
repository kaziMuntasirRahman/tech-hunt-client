import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="max-w-7xl !mx-auto border border-slate-200 min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;