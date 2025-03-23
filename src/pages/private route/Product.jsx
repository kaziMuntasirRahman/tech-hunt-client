import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsDot, BsTags } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiDelete, FiExternalLink } from "react-icons/fi";
import { PiTriangle, PiTriangleFill } from "react-icons/pi";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import DisplayRating from "../../components/DisplayRating";
import StarRating from "../../components/StarRating";
import useGetStatus from "../../hooks/useGetStatus";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const promoteAudio = new Audio('/assets/sound/upvote.wav')
const demoteAudio = new Audio('/assets/sound/un_upvote.wav')

const Product = () => {
  const { status, userInfo } = useGetStatus()
  // console.log(status)
  const axiosSecure = useAxiosSecure()
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

  const { data: product = {}, refetch } = useQuery({
    queryKey: ['product', id],
    enabled: true,
    queryFn: async () => {
      const response = await axiosSecure.get(`products/${id}`)
      return response.data;
    }
  })

  const { _id, name, image, description, productOwner = {}, tags = [], externalLinks = [], isFeatured, upvotes = [], reviews = [] } = product;

  // const [isUpvoted, setIsUpvoted] = useState(false)
  // const [upvoteCount, setUpvoteCount] = useState(upvotes?.length)
  const [averageRating, setAverageRating] = useState(0)
  const [ratingCount, setRatingCount] = useState([0, 0, 0, 0, 0]);


  useEffect(() => {
    let reviewLength = reviews.length || 0;
    // setIsUpvoted(upvotes.includes(userInfo.email))
    // setUpvoteCount(upvotes?.length)
    setAverageRating((reviews.reduce((total, review) => total + review.rating, 0)) / reviewLength)
    let ratingPercentages = [0, 0, 0, 0, 0]
    for (let i = 0; i < reviewLength; i++) {
      ratingPercentages[reviews[i].rating - 1] += 1
    }
    setRatingCount(ratingPercentages)
    // console.log(ratingCount)
  }, [userInfo?.email, reviews])

  const handleUpvotes = async () => {
    if (!userInfo?.email) {
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
      const response = await axiosSecure.patch(`products/upvotes?id=${_id}&email=${userInfo.email}`)
      if (response.data.upvoted) {
        promoteAudio.play()
        // console.log(response.data.message)
        refetch();
      } else if (!response.data.upvoted) {
        demoteAudio.play()
        // console.log(response.data.message)
        refetch();
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      // console.log("Finally block in the cart component executed...")
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // console.log("New Review:",newReview, "Rating:",rating)
    if (rating < 1) {
      return alert("Give a rating to submit...")
    }
    const newReviewDetails = { reviewerName: userInfo.name, reviewerEmail: userInfo.email, reviewerImage: userInfo?.photoURL, reviewDescription: newReview, rating }
    // console.log(newReviewDetails)
    try {
      const response = await axiosSecure.patch(`products/reviews/${_id}`, newReviewDetails)
      console.log(response.data)
      if (response.data.modifiedCount > 0) {
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Review has been Posted.",
          showConfirmButton: false,
          timer: 2500
        });
        e.target.reset()
        setRating(0)
        setNewReview("")
      }
    } catch (err) {
      console.log(err.message)
      if (err.status === 409) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "You've already reviewed this product.",
          showConfirmButton: false,
          timer: 2500
        });
        e.target.reset()
        setRating(0)
        setNewReview("")
      }
    } finally {
      console.log("Finally block inside handleSubmitReview executed.")
    }
  }

  const handleDeleteReview = async (index) => {
    if (status !== 'admin') {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Sorry! Only Admin can delete Reviews.",
        showConfirmButton: false,
        timer: 1500
      });
    }
    const isConfirmed = confirm('Do you really want to delete this review?')
    if (!isConfirmed) {
      return
    }
    const id = _id;
    console.log(id, index)

    try {
      const url = `products/reviews/${id}?index=${index}`
      console.log(url)
      const response = await axiosSecure.delete(url)
      console.log(response.data)
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The comment has been deleted.",
          showConfirmButton: false,
          timer: 1500
        });
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        refetch();
      } else {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Sorry! Failed to delete.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      console.log("Finally block in the handleDeleteReview executed.")
    }
  }


  return (
    <div className="w-full p-10 flex flex-col gap-5 bg-amber-100/0">
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
        <a href='#public-review' className=" ml-auto h-[52px] px-10 mr-10 rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
          <FaRegComment />
          <p>{reviews.length}</p>
        </a>
        {/* Upvote button */}
        {
          (upvotes.includes(userInfo.email)) ?
            <div onClick={handleUpvotes} className="h-[52px] px-10 rounded-xl text-[#FF6154] border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
              <PiTriangleFill />
              <p>{upvotes.length}</p>
            </div>
            :
            <div onClick={handleUpvotes} className="h-[52px] px-10 rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
              <PiTriangle />
              <p>{upvotes.length}</p>
            </div>
        }
      </section>
      {/* product owner info */}
      <section className="flex items-center gap-4">
        <img src={productOwner.image} className="size-[52px] rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer" />
        <h1 className="text-xl font-medium text-gray-600">{productOwner.name}</h1>
        <hr />
      </section>
      {/* average rating */}
      <section className="flex">
        <div className="flex flex-col items-center gap-2 mr-10">
          <h1 className="text-6xl font-semibold ">{reviews.length>0?averageRating.toFixed(1):0}</h1>
          <DisplayRating rating={Math.round(reviews.length>0?averageRating.toFixed(1):0)} />
          <p>{(reviews.length)} Reviews</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          {/* 5 * rating percentage bar */}
          {
            [...ratingCount].reverse().map((count, index) =>
              <div key={index} className="flex items-center gap-2 w-full h-3.5 bg-gray-200 hover:bg-green-200 transition-all ease-in-out duration-300 rounded-4xl tooltip relative" data-tip={`${count} reviews`}>
                <p className="absolute -left-4">{5 - index}</p>
                <div className="h-full bg-[#00865F] rounded-4xl" style={{ width: `${count * 100 / reviews.length}%` }} />
              </div>
            )
          }
        </div>
      </section>
      {/* review section */}
      <form onSubmit={handleSubmitReview} className="flex flex-col gap-3 border border-gray-200 p-2 rounded-lg">
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
              < p > You haven't Rated Yet.</p>
              :
              <p>Your Rating: <span className="font-semibold">{rating}({ratingNames[rating - 1]})</span></p>
          }
        </div>
        {
          userInfo?.email ?
            <button className="btn self-end">Submit Review</button>
            :
            <div className="tooltip self-end" data-tip="Login to post Review."><button className="btn btn-disabled">Submit Review</button></div>
        }
      </form>
      {/* public review section */}
      <section id='public-review' className="flex flex-col gap-8 ">
        {
          reviews.map((review, index) =>
            <Review
              review={review}
              key={index}
              index={index}
              handleDeleteReview={handleDeleteReview}
              status={status} />
          )
        }

      </section>
    </div >
  );
};

export default Product;


const Review = ({ review, handleDeleteReview, index, status }) => {
  const { reviewerName, reviewerImage, reviewDescription, rating, postedDate } = review;
  const date = new Date(postedDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  // console.log(typeof(postedDate))  
  return (
    <div className="flex flex-col gap-3 bg-white hover:bg-gray-100 transition-all duration-150 p-4 rounded-xl">
      <div className="flex items-center gap-5 mb-6">
        <img src={reviewerImage} className="size-10 rounded-full object-cover" />
        <h1 className="text-xl font-semibold">{reviewerName}</h1>
        {
          status === 'admin' ?
            <FiDelete
              onClick={() => handleDeleteReview(index)}
              className="ml-auto text-2xl self-start text-red-500 hover:text-black cursor-pointer tooltip"
              data-tip="delete"
            />
            :
            <></>
        }
      </div>
      <div className="flex justify-start gap-2.5">
        <DisplayRating rating={rating} />
        <p title={postedDate} className="hover:underline cursor-pointer">{formattedDate}</p>
        {/* <p>March 5, 2025</p> */}
      </div>
      <p>{reviewDescription}</p>
    </div>
  )
}