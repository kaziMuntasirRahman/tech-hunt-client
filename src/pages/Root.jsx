import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="max-w-7xl !mx-auto border border-slate-200 min-h-screen">
      <Navbar />
      Tech Hunt Initiated.....
      {/* <Outlet /> */}
    </div>
  );
};

export default Root;