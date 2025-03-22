import { useContext } from "react";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCoupon } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GoReport } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdHome } from "react-icons/io";
import { IoLogOutOutline, IoStatsChart } from "react-icons/io5";
import { MdOutlineRateReview, MdProductionQuantityLimits } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useGetStatus from "../../hooks/useGetStatus";
import { AuthContext } from "../../providers/AuthProvider";
import './dashboard.css';
import { FaUsersLine } from "react-icons/fa6";


const DashboardContainer = () => {
  const { status, loading: statusLoading } = useGetStatus()
  const { loading, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()
  // console.log(status)
  const logOut = () => {
    handleLogout()
    navigate('/')
  }
  return (
    <div className="max-w-6xl !mx-auto border-l border-r border-red-500 min-h-screen grid grid-cols-4 overflow-x-hidden">
      {/* TODO: Uncomment this later */}
      {
        (loading || statusLoading) ?
          <NavbarSkeleton />
          :
          status === 'general' ?
            <UserNavbar logout={logOut} />
            :
            status === 'moderator' ? <ModeratorNavbar logout={logOut} />
              :
              status === 'admin' ? <AdminNavbar logout={logOut} />
                :
                <div className="navbar-container" />
      }
      <div className="col-span-3 bg-blue-200">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardContainer;

const UserNavbar = ({ logout }) => {
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
      <hr className="!p-0" />
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
      <NavLink to='manage-coupons'>
        <BiSolidCoupon /><p>Manage Coupons</p>
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

