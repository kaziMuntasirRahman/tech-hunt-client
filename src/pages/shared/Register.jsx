import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import '../../../src/index.css';
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ContinueWithGoogle from "../../components/ContinueWithGoogle";

const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

const Register = ({ setRegisterModal, closeModal }) => {
  const { createUser, loading } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const [registrationLoading, setRegistrationLoading] = useState(false)

  const [newUser, setNewUser] = useState({
    name: "", email: "", photo: null, password: ""
  })

  const handleRegister = async (e) => {
    // console.log(newUser)
    setRegistrationLoading(true)
    const { name, email, password } = newUser;
    e.preventDefault();
    try {
      let imgURL = "";
      if (newUser.photo) {
        const imageFile = { image: newUser.photo }
        const response = await axios.post(img_hosting_url, imageFile, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(response.data)
        if (response.data.success) {
          imgURL = response.data.data.url;
          console.log("Profile photo has successfully been uploaded.")
        }
      }
      // register user after image been uploaded
      const res = await createUser(name, email, imgURL, password)
      console.log(res)
      if (res.email) {
        const modifiedUser = { name: res.displayName, email: res.email, photoURL: res.photoURL }
        console.log(modifiedUser)
        const dbResponse = await axiosPublic.post('users', modifiedUser)
        if (dbResponse.data.insertedId) {
          const audio = new Audio('/assets/sound/success-1.mp3')
          audio.play()
          console.log("User info added to database.")
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You've Successfully Registered.",
            showConfirmButton: false,
            footer: `Welcome ${res.displayName}`,
            timer: 2000
          });
        }
        console.log(dbResponse)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to Signup",
          footer: '<a href="#">Please try again later.</a>',
          timer: 2000
        });
      }

    } catch (err) {
      console.log(err)
    } finally {
      closeModal()
      console.log("Finally block in the register page executed...")
    }
  }


  return (
    <div className="card bg-base-100 w-full shrink-0 py-6">
      {
        (loading || registrationLoading) ?
          <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
            <span className="loader scale-200" ></span>
          </div>
          :
          <></>
      }
      <h1 className="text-center text-3xl">{registrationLoading ? "Signing Up..." : "Sign Up"}</h1>
      <div className="card-body">
        <form onSubmit={handleRegister} className="fieldset">
          {/* name input field */}
          <label className="fieldset-label">Name</label>
          <input
            type="name"
            className="input"
            placeholder="enter your name"
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />

          {/* email input field */}
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="enter your email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />

          {/* photo input field */}
          <label className="fieldset-label">Profile Photo</label>
          <input
            type="file"
            className="file-input file-input-neutral"
            onChange={(e) => setNewUser({ ...newUser, photo: e.target.files[0] })}
          />

          {/* password input field */}
          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="enter your password"
            required
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button type="submit" className="btn btn-neutral mt-4">Register</button>
          <p className="mb-5">Already have an account?&nbsp;<a className="link link-hover" onClick={() => setRegisterModal(false)}>Login Now</a></p>
          {/* Google */}
          <ContinueWithGoogle closeModal={closeModal} setLoading={setRegistrationLoading} />

        </form>
      </div>
    </div>
  );
};

export default Register;