import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ViewerNotice from "../components/ViewerNotice";

const Root = () => {
  return (
    <div className="max-w-7xl !mx-auto  border-slate-200 min-h-screen">
      <Navbar />
      {/* <ViewerNotice notify="Hey there! Please, complete your onboarding." button="Complete onboarding" /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;