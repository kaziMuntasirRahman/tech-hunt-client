import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ContinueWithGoogle = ({ closeModal, setLoading }) => {
  const axiosPublic = useAxiosPublic()

  const { googleSignIn } = useContext(AuthContext)


  const handleGoogleSignIn = async () => {
    try {
      const response = await googleSignIn()
      if (response?.email) {
        const modifiedUser = { name: response?.displayName, email: response?.email, photoURL: response?.photoURL, provider: 'google' }
        console.log(modifiedUser)
        const dbResponse = await axiosPublic.post('users', modifiedUser)
        if (dbResponse?.data?.insertedId) {
          const audio = new Audio('/assets/sound/success-1.mp3')
          audio.play()
          console.log("User info added to database.")
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You've Successfully Registered.",
            showConfirmButton: false,
            footer: `Welcome ${response?.displayName}`,
            timer: 2000
          });
        }
        console.log(dbResponse)
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
      setLoading(false)
      closeModal()
      // console.log("Finally block executed in the register component.")
    }
  }



  return (
    <div onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
      <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
      </svg>
      Continue with Google
    </div>
  );
};

export default ContinueWithGoogle;