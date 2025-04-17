import { useQuery } from "@tanstack/react-query";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import DisplayRating from "../../components/DisplayRating";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import Swiper styles
import 'swiper/css';
import { Autoplay } from "swiper/modules";


const Reviews = () => {
  const axiosPublic = useAxiosPublic()

  const { data: reviewDetails = [1, 2, 3, 4, 5, 6] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await axiosPublic.get('/reviews')
      // console.log(response.data);
      return response.data;
    }
  })

  return (
    <div className="wrapper !w-full !mx-auto mt-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        watchSlidesProgress={true}
        slidesPerView={3}
        className="mySwiper"

      >
        {
          reviewDetails.map(({ _id, name, review }) =>
            <SwiperSlide>

              <ReviewCart key={_id} review={review} name={name} _id={_id} />
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
  );
};

export default Reviews;

const ReviewCart = ({ review = {}, name = "", _id = "" }) => {
  const {
    reviewerName = "Every Thing",
    reviewerImage = "https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg",
    reviewDescription = "Hello from the other side, I must've called for a thousand time to tell you what sorry, for breaking your heart. Hello from the other side, I must've called for a thousand time to tell you what sorry, for breaking your heart.",
    rating = 4
  } = review;

  return (
    <div className="bg-slate-100 flex flex-col gap-2 items-center py-5 px-3 relative h-[350px] rounded-lg cursor-grab">
      <img src={reviewerImage} className="size-28 rounded-full object-cover" />
      <h1 className='font-semibold italic'>{reviewerName}</h1>
      <DisplayRating rating={rating} />
      <p>{reviewDescription?.length < 200 ? reviewDescription : `${reviewDescription.slice(0, 200)}...`}</p>
      <Link to={`products/${_id}`} className="absolute bottom-2.5 right-5 ml-auto hover:underline font-semibold text-[#FF6154] cursor-pointer">{name}</Link>
    </div>
  )
}

