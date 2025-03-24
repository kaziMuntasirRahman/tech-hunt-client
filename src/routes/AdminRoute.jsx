import { Navigate } from "react-router-dom";
import useGetStatus from "../hooks/useGetStatus";

const AdminRoute = ({ children }) => {
  const { status, isLoading } = useGetStatus()

  if (isLoading) {
    return (
      <div className="relative h-full flex items-center justify-center p-8">
        <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
          <span className="loader scale-200" ></span>
        </div>
      </div>
    )
  }

  if (status === 'admin') {
    return children
  }

  return (<Navigate state={location.pathname} to='/' replace />)
};

export default AdminRoute;