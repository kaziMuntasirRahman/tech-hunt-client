import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Login = ({ setRegisterModal, closeModal }) => {
  const { loading, logIn, googleSignIn } = useContext(AuthContext)
  const [existingUser, setExistingUser] = useState({ email: "", password: "" })
  const [loginLoading, setLoginLoading] = useState(false)

  const handleLogin = async (e) => {
    setLoginLoading(true)
    e.preventDefault()
    // console.log(existingUser)
    const { email, password } = existingUser
    try {
      const response = await logIn(email, password)
      console.log(response)
      if (response.email) {
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You've Successfully Logged In.",
          showConfirmButton: false,
          footer: `Welcome Back ${response.displayName.toUpperCase()}`,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to Sign in",
          footer: '<a href="#">Please try again later.</a>',
          timer: 2000
        });
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoginLoading(false)
      e.target.reset()
      closeModal();
      console.log("finally block in the login component executed...")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleSignIn()
      if (response?.email) {
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You've successfully logged in.",
          showConfirmButton: false,
          footer: "Welcome",
          timer: 2000
        });
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoginLoading(false)
      closeModal()
      console.log("Finally block executed in the register component.")
    }
  }



  return (
    <div className="card bg-base-100 shrink-0 py-6">
      {
        (loading || loginLoading) ?
          <div className="absolute left-0 top-0 z-[999] bg-slate-700/30 h-full w-full flex items-center justify-center">
            <span className="loader scale-200" ></span>
          </div>
          :
          <></>
      }
      <h1 className="text-center text-3xl">{loginLoading ? "Logging in..." : "Login"}</h1>
      <div className="card-body">
        <form onSubmit={handleLogin} className="fieldset">
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input focus:outline-none"
            placeholder="enter your email"
            onChange={(e) => setExistingUser({ ...existingUser, email: e.target.value })}
            required
          />
          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setExistingUser({ ...existingUser, password: e.target.value })}
            required
          />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4"
          // onClick={()=>}
          >Login</button>
          <p className="mb-5">New Here?&nbsp;<a className="link link-hover" onClick={() => setRegisterModal(true)}>Register Now</a></p>
          {/* Google */}
          <div onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
            </svg>
            Continue with Google
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;