import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import ContinueWithGoogle from "../../components/ContinueWithGoogle";

const Login = ({ setRegisterModal, closeModal }) => {
  const { loading, logIn } = useContext(AuthContext)
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
          <ContinueWithGoogle closeModal={closeModal} setLoading={setLoginLoading} />
        </form>
      </div>
    </div>
  );
};

export default Login;