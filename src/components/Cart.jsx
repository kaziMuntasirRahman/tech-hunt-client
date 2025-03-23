import { BsDot, BsTags } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { PiTriangle, PiTriangleFill } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Cart = ({ cart, index }) => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const { _id, name, description, image, reviews, upvotes, tags } = cart;
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(upvotes?.length || 0)

  useEffect(() => {
    setIsUpvoted(upvotes.includes(user?.email))
    setUpvoteCount(upvotes?.length || 0)
  }, [user, upvotes])


  const handleUpvotes = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "You're not logged in.",
        text: "Please login to upvote this product.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#FF6154",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          const loginModal = document.getElementById('auth_modal')
          loginModal.showModal()
        }
        return;
      });
    }
    // console.log("Upvote Request received for the product with id:", _id)
    try {
      const response = await axiosSecure.patch(`products/upvotes?id=${_id}&email=${user.email}`)
      if (response.data.upvoted) {
        const audio = new Audio('/assets/sound/upvote.wav')
        audio.play()
        console.log(response.data.message)
        setIsUpvoted(!isUpvoted)
        setUpvoteCount(upvoteCount + 1)
      } else if (!response.data.upvoted) {
        const audio = new Audio('/assets/sound/un_upvote.wav')
        audio.play()
        console.log(response.data.message)
        setIsUpvoted(!isUpvoted)
        setUpvoteCount(upvoteCount - 1)
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      // console.log("Finally block in the cart component executed...")
    }

  }

  return (
    <div className="p-4 flex items-center gap-4 rounded-2xl bg-white hover:bg-slate-50 transition-all ease-in">
      <div className="size-12 shrink-0 object-cover rounded-xl skeleton">
        <img src={image} className="h-full w-full shrink-0 object-cover rounded-xl z-10" />
      </div>
      {/* description section */}
      <section className="flex flex-col gap-1">
        <Link to={`/products/${_id}`} className="text-[#051431] font-semibold">
          {index + 1}.&nbsp;<span className="hover:text-[#FF6154] transition-all ease-in-out cursor-pointer">{name}</span>
        </Link>
        {
          description.length > 140 ?
            <p className="text-[#344054]">{description.slice(0, 140)}... <Link className="text-amber-700 hover:underline"  to={`/products/${_id}`}>View More</Link></p>
            :
            <p className="text-[#344054]">{description}</p>
        }
        <div id="tags" className="flex items-center gap-2">
          <BsTags />
          <p className="hover:underline cursor-pointer">{tags[0]}</p>
          <BsDot />
          <p className="hover:underline cursor-pointer">{tags[1]}</p>
          <BsDot />
          <p className="hover:underline cursor-pointer">{tags[2]}</p>
        </div>
      </section>
      {/* comment button */}
      <Link to={`/products/${_id}#public-review`} className="ml-auto size-[52px] min-w-[52] shrink-0 rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
        <FaRegComment />
        <p>{reviews?.length || 0}</p>
      </Link>
      {/* Upvote button */}
      {
        isUpvoted ?
          <div onClick={handleUpvotes} className="size-[52px] min-w-[52] shrink-0 rounded-xl text-[#FF6154] border-2 border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm tooltip" data-tip="upvoted">
            <PiTriangleFill />
            <p>{upvoteCount}</p>
          </div>
          :
          <div onClick={handleUpvotes} className="size-[52px] min-w-[52] shrink-0 rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm tooltip" data-tip="upvote now">
            <PiTriangle />
            <p>{upvoteCount}</p>
          </div>
      }
    </div>
  );
};

export default Cart;