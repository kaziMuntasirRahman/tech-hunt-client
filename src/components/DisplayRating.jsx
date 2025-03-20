import { FaStar } from "react-icons/fa";

const DisplayRating = ({ rating }) => {
  // Define names for each rating level
  const ratingNames = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ]
  return (
    <div className="flex justify-center items-center">
      {
        Array(5).fill().map((_, index) =>
          <div
            key={index}
            className="tooltip"
            data-tip={ratingNames[index]}>
            <FaStar
              className={`${rating > index ? "text-green-500" : "text-gray-300"} cursor-pointer brightness-100 text-2xl`}
            />
          </div>
        )
      }
    </div>
  )
}

export default DisplayRating;