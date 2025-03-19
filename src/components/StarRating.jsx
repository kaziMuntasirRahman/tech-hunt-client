import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const [displayRating, setDisplayRating] = useState(rating)
  // Define names for each rating level
  const ratingNames = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ]
  return (
    <div className="flex items-center">
      {
        Array(5).fill().map((_, index) =>
          <div
            key={index}
            className="tooltip"
            data-tip={ratingNames[index]}>
            <FaStar
              onMouseOver={() => setDisplayRating(index + 1)}
              onMouseLeave={() => setDisplayRating(rating)}
              onClick={() => setRating(index + 1)}
              className={`${displayRating > index ? "text-[#e49d34]" : "text-[#D0D0D0]"} cursor-pointer brightness-100 px-1 text-4xl`}
            />
          </div>
        )
      }
    </div>
  );
};

export default StarRating;