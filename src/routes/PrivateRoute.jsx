import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext)
  if (loading) {
    return (
      <div className="relative h-screen w-screen flex items-center justify-center p-8">
        <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
          <span className="loader scale-200" ></span>
        </div>
      </div>
    )
  }

  if (user?.email) {
    return children;
  }

  return (<Navigate state={location.pathname} to='/' replace />)


};

export default PrivateRoute;