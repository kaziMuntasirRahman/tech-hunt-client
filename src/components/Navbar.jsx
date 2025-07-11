import { useContext, useEffect, useRef, useState } from "react";
import { CiLogin, CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import { AuthContext } from "../providers/AuthProvider";
import { GoBell } from "react-icons/go";

const navLinks = [
  {
    title: "Home",
    link: "/",
    icon: "home"
  },
  {
    title: "Products",
    link: "/products",
    icon: "box"
  },
  {
    title: "About",
    link: "/about",
    icon: "info-circle"
  },
  {
    title: "Contact",
    link: "/contact",
    icon: "phone"
  }
];


const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext)
  const [registerModal, setRegisterModal] = useState(true)
  const searchRef = useRef(null);

  const closeModal = () => {
    const modal = document.getElementById('auth_modal')
    modal.close()
    setRegisterModal(false)
  }

  const handleKeyDown = e =>{
    if(e.ctrlKey && e.key === 'k'){
      e.preventDefault() // prevent browser's default search
      searchRef.current?.focus()
    }else if(e.key==='Escape'){
      searchRef.current?.blur()
    }
  }

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    
    return ()=>{
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])



  const handleLogout = async () => {
    try {
      const response = await logOut()
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You've successfully logged out.",
          showConfirmButton: false,
          footer: "See You Later!",
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Sorry! Failed to Logout.",
        showConfirmButton: false,
        footer: "Try Later!",
        timer: 2000
      });
      console.log(error)
    }
  }

  return (
    <nav className="grid grid-cols-3 pt-4 pb-5 border border-slate-50 sticky top-0 bg-white z-50">
      {/* navbar left */}
      <div className="flex items-center gap-6">
        {/* logo */}
        <Link>
          <img className="size-10 rounded-full" src="/assets/images/tech-hunt-logo.webp" />
        </Link>
        {/* search bar */}
        <label className="rounded-full relative flex items-center gap-2 bg-gray-200">
          <CiSearch className="absolute left-4 text-gray-500" />
          <input
            ref={searchRef}
            type="search"
            placeholder="Search ( ctrl + k )"
            className="!pl-10 pr-4 py-2 rounded-full w-[190px] focus:w-[250px]  focus:outline-gray-600 duration-300 ease-in-out" />
        </label>
      </div>
      {/* navbar center */}
      <div className="flex justify-center items-center gap-5">

        {
          navLinks.map(({ title, link }) =>
            <NavLink to={link} className={({ isActive, isPending }) =>
              isActive
                ? "link link-hover font-bold text-[#FF6154]"
                : isPending
                  ? "pending"
                  : "link link-hover"
            }>{title}</NavLink>
          )
        }
      </div>
      {/* navbar right */}
      <div className="ml-auto flex gap-8">
        <button
          onClick={() => document.getElementById('notification_modal').showModal()}
          className="bg-white rounded-full p-3 border border-gray-200 hover:border-gray-400 cursor-pointer transition-all duration-200 tooltip tooltip-left" data-tip="Notification">
          <GoBell className="text-xl" />
        </button>
        {
          loading ?
            <div className="avatar">
              <div className="mask mask-squircle w-10 animate-pulse bg-gray-500" />
            </div>
            :
            user?.email ?
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <div className="avatar">
                  <div className="mask mask-squircle w-10  cursor-pointer">
                    <img src={user?.photoURL} tabIndex={0} role="button" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-slate-50 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a className={`${loading && 'animate-pulse'} cursor-default font-semibold`}>{!loading ? user?.displayName?.toUpperCase() : "Loading..."}</a></li>
                  <li><Link to='/dashboard/my-products'>My Products</Link></li>
                  <li><Link to='/dashboard'>Dashboard</Link></li>
                  <hr className="mx-3 my-2 text-gray-400" />
                  <li className="text-red-700"><a onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
              :
              <button className="btn bg-white rounded-full flex items-center text-sm"
                onClick={() => {
                  setRegisterModal(false),
                    document.getElementById('auth_modal').showModal()
                }}>
                <CiLogin />
                <p>Login</p>
              </button>
        }
      </div>
      {/* registration/login modal */}
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

      {/* registration/login modal */}
      <dialog id="notification_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
          <p className="text-lg">Notifications are coming...</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </nav >
  );
};

export default Navbar;
