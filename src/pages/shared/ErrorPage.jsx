import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ViewerNotice from "../../components/ViewerNotice";

const ErrorPage = () => {
  return (
    <div className="w-full min-h-screen relative">
      {/* <div className="max-w-7xl !mx-auto overflow-x-hidden">
        <Navbar />
        <ViewerNotice notify="Hey there! Please, complete your onboarding." button="Complete onboarding" />
      </div> */}
      <div className="w-full relative h-screen">
        <img src={`/assets/images/404/${Math.ceil(Math.random()*10)}.jpg`} className="w-full object-cover" />
        <div className="bg-white p-8 flex flex-col items-start gap-2 absolute bottom-0 left-10 rounded-lg w-[448px]">
          <h1 className="text-2xl font-semibold text-gray-500">404</h1>
          <h1 className="text-3xl font-semibold text-black">We seem to have lost this page</h1>
          <p className="text-base font-normal text-gray-500">Please accept these adorable photos of our TH team's furry friend as our humble apology for the inconvenience. Let's get you back to the homepage.</p>
          <Link to='/' className="btn bg-[#FF5D5B] text-white font-bold">Go to the homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;