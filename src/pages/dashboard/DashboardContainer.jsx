import { useContext } from "react";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCoupon } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaMoneyCheck, FaUsersLine } from "react-icons/fa6";
import { GoReport } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdHome } from "react-icons/io";
import { IoLogOutOutline, IoStatsChart } from "react-icons/io5";
import { MdOutlineRateReview, MdProductionQuantityLimits } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useGetStatus from "../../hooks/useGetStatus";
import { AuthContext } from "../../providers/AuthProvider";
import './dashboard.css';


const DashboardContainer = () => {
  const { loading: statusLoading, userInfo } = useGetStatus()
  const { status, hasPaidSubscription } = userInfo;
  const { handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()
  // console.log(status)
  const logOut = () => {
    handleLogout()
    navigate('/')
  }

  if (statusLoading)
    return (
      <div className="max-w-6xl mx-auto min-h-screen grid grid-cols-4 overflow-x-hidden">
        <NavbarSkeleton />
        <div className="col-span-3 bg-blue-200">
          <div className="absolute inset-0 bg-slate-700/30 flex items-center justify-center z-50">
            <span className="loader scale-200"></span>
          </div>
        </div>
      </div>
    )

  return (
    <div className="max-w-6xl mx-auto min-h-screen grid grid-cols-4 overflow-x-hidden">
      {/* display navbar based on the role of the user */}
      {
        status === 'general' ?
          <UserNavbar logout={logOut} hasPaidSubscription={hasPaidSubscription} /> :
          status === 'moderator' ? <ModeratorNavbar logout={logOut} /> :
            status === 'admin' ? <AdminNavbar logout={logOut} /> :
              <NavbarSkeleton />
      }
      <div className="col-span-3 bg-blue-200">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardContainer;

const UserNavbar = ({ logout, hasPaidSubscription }) => {
  return (
    <nav className="navbar-container font-semibold bg-amber-200">
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      }
        end
        to=''>
        <CgProfile /><p>My Profile</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='update-profile'>
        <RiUserSettingsLine /><p>Update Profile</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='my-products'>
        <MdProductionQuantityLimits /><p>My Products</p>
      </NavLink>
      <NavLink to='add-product'>
        <IoIosAddCircleOutline /><p>Add Product</p>
      </NavLink>
      {
        hasPaidSubscription === true ?
          <button className="btn btn-success w-fit mx-auto cursor-default">
            <p>Subscribed</p>
          </button>
          :
          hasPaidSubscription === 'pending' ?
            <button className="btn btn-success w-fit mx-auto cursor-default tooltip tooltip-right" data-tip="Wait until Authority verify the payment request.">
              <p className="animate-pulse">Subscription Pending...</p>
            </button>
            :
            <Link to='payment' className="cursor-pointer hover:border-none btn btn-secondary  w-fit mx-auto">
              <p className="animate-bounce">Subscribe Now!</p>
            </Link>
      }
      <hr className="!p-0 my-2" />
      <button onClick={logout} className="cursor-pointer">
        <IoLogOutOutline /><p>Logout</p>
      </button>
      <NavLink to='/'><IoMdHome /><p>Home</p></NavLink>
    </nav>
  )
}

const ModeratorNavbar = ({ logout }) => {
  return (
    <nav className="navbar-container font-semibold bg-amber-200">
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      }
        end
        to=''>
        <CgProfile /><p>My Profile</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='product-review'>
        <MdOutlineRateReview /><p>Product Review</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='manage-reports'>
        <GoReport /><p>Reported Contents</p>
      </NavLink>
      <hr className="!p-0" />
      <button onClick={logout} className="cursor-pointer">
        <IoLogOutOutline /><p>Logout</p>
      </button>
      <NavLink to='/'>
        <IoMdHome /><p>Home</p>
      </NavLink>
    </nav>
  )
}

const AdminNavbar = ({ logout }) => {
  return (
    <nav className="navbar-container font-semibold bg-amber-200">
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      }
        end
        to=''>
        <CgProfile /><p>My Profile</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='statistics'>
        <IoStatsChart /><p>Statistics</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='manage-user'>
        <FaUsersLine /><p>Manage Users</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='manage-coupons'>
        <BiSolidCoupon /><p>Manage Coupons</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isActive
          ? "active-navlink"
          : isPending
            ? "pending"
            : ""
      } to='manage-payments'>
        <FaMoneyCheck /><p>Manage Payments</p>
      </NavLink>
      <hr className="!p-0" />
      <button onClick={logout} className="cursor-pointer">
        <IoLogOutOutline /><p>Logout</p>
      </button>
      <NavLink to='/'><IoMdHome /><p>Home</p>
      </NavLink>
    </nav>
  )
}

const NavbarSkeleton = () => {
  return (
    <nav className="navbar-container font-semibold bg-amber-200">
      {
        Array(6).fill(6).map((index) =>
          <div key={index} className="animate-pulse">
            <AiFillProduct /><p>Loading</p>
          </div>
        )
      }
    </nav>
  )
}

