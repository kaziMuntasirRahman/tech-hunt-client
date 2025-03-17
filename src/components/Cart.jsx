import { BsDot, BsTags } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { PiTriangle } from "react-icons/pi";

const Cart = ({ cart, index }) => {
  const { name, description, image, reviews, upvotes, tags } = cart;
  return (
    <div className="p-4 flex items-center gap-4 rounded-2xl bg-white hover:bg-slate-50 transition-all ease-in">
      <div className="size-12 object-cover rounded-xl skeleton">
        <img src={image} className="h-full w-full object-cover rounded-xl z-10" />
      </div>
      {/* description section */}
      <section className="flex flex-col gap-1">
        <h1 className="text-[#051431] font-semibold">
          {index + 1}.&nbsp;<span className="hover:text-[#FF6154] transition-all ease-in-out cursor-pointer">{name}</span>
        </h1>

        <p className="text-[#344054]">{description}</p>
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
      <div className="ml-auto size-[52px] rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
        <FaRegComment />
        <p>{reviews.length}</p>
      </div>
      {/* Upvote button */}
      <div className="size-[52px] rounded-xl border-2 border-gray-200 hover:border-[#FF6154] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-sm">
        <PiTriangle />
        <p>{upvotes.length}</p>
      </div>
    </div>
  );
};

export default Cart;