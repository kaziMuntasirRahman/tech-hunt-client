import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Footer = () => {
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext)
  const [mail, setMail] = useState("")

  const handleSubscriber = async (e) => {
    e.preventDefault()
    if (!mail) {
      setMail(user.email)
    }
    console.log("Received subscriber request for", mail)
    try {
      const response = await axiosPublic.patch(`/users/subscribers/${mail}`)
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank You!!!",
          footer: "You are now a subscriber of TechHunt.",
          showConfirmButton: false,
          timer: 1500
        });
      } else if (response.status == 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Congratulations!!!",
          footer: "You are already a subscriber of TechHunt.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      console.log("Finally block in the footer component executed..")
    }
  }
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <img src="/assets/images/tech-hunt-logo.jpg" className="size-12 rounded-full" />
        <p>
          Tech Hunt
          <br />
          Providing reliable tech since 2025
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <form>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="w-80">
          <label>Subscribe to our newsletter now</label>
          <div className="join mt-3">
            <input
              type="text"
              placeholder="username@site.com"
              defaultValue={user?.email}
              onChange={(e) => setMail(e.target.value)}
              className="input input-bordered join-item" />
            <button onClick={handleSubscriber} className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;