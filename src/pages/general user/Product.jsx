import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BsDot, BsTags } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { PiTriangle, PiTriangleFill } from "react-icons/pi";
import StarRating from "../../components/StarRating";

const Product = () => {
  const { user } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const id = useLoaderData()
  const [rating, setRating] = useState(0)
  // console.log(id)
  // Define names for each rating level
  const ratingNames = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ]
  const [newReview, setNewReview] = useState("")

  const { data: product = {} } = useQuery({
    queryKey: ['product', id],
    enabled: true,
    queryFn: async () => {
      const response = await axiosPublic.get(`products/${id}`)
      return response.data;
    }
  })

  const { _id, name, image, description, productOwner = {}, tags = [], externalLinks = [], isFeatured, upvotes = [], reviews = [] } = product;

  const [isUpvoted, setIsUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(upvotes?.length)

  useEffect(() => {
    setIsUpvoted(upvotes.includes(user?.email))
    setUpvoteCount(upvotes?.length)
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
      const response = await axiosPublic.patch(`products/upvotes?id=${_id}&email=${user.email}`)
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

  const handleSubmitReview = async () => {
    // console.log("New Review:",newReview, "Rating:",rating)
    if (rating < 1) {
      return alert("Give a rating to submit...")
    }
    const newReviewDetails = { reviewerName: user.displayName, reviewerEmail: user.email, reviewerImage: user?.photoURL, reviewDescription: newReview, rating }
    console.log(newReviewDetails)
    try {
      const response = await axiosPublic.patch(`products/reviews/${_id}`, newReviewDetails)
      console.log(response.data)
      if (response.data.modifiedCount > 0) {
        alert("Your review has been posted..")
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      console.log("Finally block inside handleSubmitReview executed.")
    }
  }

  return (
    <div className="w-full p-10 flex flex-col gap-5 bg-amber-100">
      <div className="relative">
        <img src={image} className="w-full h-72 object-cover rounded-lg" />
        {
          isFeatured ?
            <h2 className="absolute right-0 top-5 bg-red-800 text-2xl text-white px-4 py-1 rounded-l-2xl">Featured</h2>
            :
            <></>
        }
      </div>
      <div className="text-3xl font-semibold flex items-center gap-4">
        <h1>{name}</h1>
        <Link to={externalLinks[0]}>
          <FiExternalLink />
        </Link>
      </div>
      {/* <p>{postedDate}</p> */}
      <p>{description}</p>
      <section className="flex items-center justify-between">
        <div id="tags" className="flex items-center gap-1">
          <BsTags className="mr-3" />
          <p className="hover:underline cursor-pointer">{tags[0]}</p>
          <BsDot />
          <p className="hover:underline cursor-pointer">{tags[1]}</p>
          <BsDot />
          <p className="hover:underline cursor-pointer">{tags[2]}</p>
        </div>
        {/* comment button */}
        <div className="ml-auto h-[52px] px-10 mr-10 rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
          <FaRegComment />
          <p>{reviews.length}</p>
        </div>
        {/* Upvote button */}
        {
          isUpvoted ?
            <div onClick={handleUpvotes} className="h-[52px] px-10 rounded-xl text-[#FF6154] border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
              <PiTriangleFill />
              <p>{upvoteCount}</p>
            </div>
            :
            <div onClick={handleUpvotes} className="h-[52px] px-10 rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
              <PiTriangle />
              <p>{upvoteCount}</p>
            </div>
        }
      </section>
      {/* product owner info */}
      <section className="flex items-center gap-4">
        <img src={productOwner.image} className="size-[52px] rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer" />
        <h1 className="text-xl font-medium text-gray-600">{productOwner.name}</h1>
        <hr />
      </section>
      <div className="flex flex-col gap-3 border border-gray-200 p-2 rounded-lg">
        <p>Write a Review</p>
        <textarea
          placeholder="Write a review"
          rows={6}
          className="textarea p-4 rounded-xl w-full focus:outline-none"
          onChange={(e) => setNewReview(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <p className="text-xl">Rate this product: </p>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div className="text-xl">
          {
            (rating < 1) ?
              < p > You'ven't Rated Yet.</p>
              :
              <p>Your Rating: <span className="font-semibold">{rating}({ratingNames[rating - 1]})</span></p>
          }
        </div>
        {
          user?.email ?
            <button onClick={handleSubmitReview} className="btn self-end">Submit Review</button>
            :
            <div className="tooltip self-end" data-tip="Login to post Review."><button className="btn btn-disabled ">Submit Review</button></div>
        }
      </div>
    </div >
  );
};

export default Product;