import { useContext, useState } from "react";
import { CiLogin, CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import Register from "../pages/shared/Register";
import Login from "../pages/shared/Login";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext)
  const [registerModal, setRegisterModal] = useState(true)

  const closeModal = () => {
    const modal = document.getElementById('auth_modal')
    modal.close()
    setRegisterModal(false)
  }

  const handleLogout = async () => {
    try {
      const response = await logOut()
      if (response) {
        alert("Logout Successful")
      }
    } catch (error) {
      alert("Sorry, Logout failed")
      console.log(error)
    }
  }

  return (
    <nav className="flex gap-10 py-5 border border-slate-300">
      {/* logo */}
      <Link>
        <img className="size-10 rounded-full" src="/assets/images/tech-hunt-logo.webp" />
      </Link>
      {/* search bar */}
      <label className="border rounded-full relative flex items-center gap-2 border-gray-100">
        <CiSearch className="absolute left-5 text-gray-500" />
        <input
          type="search"
          placeholder="Search ( ctrl + k )"
          className="!pl-10 pr-5 focus:outline-none focus:border-none" />
      </label>
      {/* navbar center */}
      <div className="navbar-center hidden lg:flex gap-3">
        <NavLink to='/' className="link link-hover">Home</NavLink>
        <NavLink to='/products' className="link link-hover">Products</NavLink>
        <NavLink to='/about' className="link link-hover">About</NavLink>
      </div>
      {/* login button */}
      <button className="btn bg-white rounded-full flex items-center text-sm ml-auto"
        onClick={() => {
          setRegisterModal(false),
            document.getElementById('auth_modal').showModal()
        }}>
        <CiLogin />
        <p>Login</p>
      </button>
      {
        user?.email ?
          <>
            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end ml-auto">
              <div className="avatar">
                <div className="mask mask-squircle w-10">
                  <img src={user?.photoURL} tabIndex={0} role="button" />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a className={`${loading && 'animate-pulse'} cursor-default font-semibold`}>{!loading ? user?.displayName.toUpperCase() : "Loading..."}</a></li>
                <li><Link to='/dashboard/my-products'>My Products</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <hr className="mx-3 my-2 text-gray-400" />
                <li className="text-red-700"><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </>
          :
          <div className="avatar">
            <div className="mask mask-squircle w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
      }
      <dialog id="auth_modal" className="modal z-40">
        <div className="modal-box !px-0 py-0 h-auto w-96 relative duration-300">
          <form method="dialog" className="!z-50">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">✕</button>
          </form>
          {
            registerModal ?
              <Register setRegisterModal={setRegisterModal} closeModal={closeModal} />
              :
              <Login setRegisterModal={setRegisterModal} closeModal={closeModal} />
          }
        </div>
      </dialog>
    </nav >
  );
};

export default Navbar;
