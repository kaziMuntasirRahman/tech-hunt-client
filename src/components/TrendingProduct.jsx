import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { PiTriangle } from "react-icons/pi";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";

const TrendingProduct = () => {
  const { products } = useProducts()
  const [sortedProducts, setSortedProducts] = useState([])
  // const [showAllProducts, setShowAllProducts]= useState(false)
  // useEffect(() => {
  //   fetch('/data/products.json')
  //     .then(res => res.json())
  //     .then(data => setSortedProducts(data.sort((a, b) => b.upvotes.length - a.upvotes.length)))
  // }, [])
  useEffect(() => {
    if (products) {
      const sorted = [...products].sort((a, b) => (b.upvotes.length) - (a.upvotes.length))
      setSortedProducts(sorted)
      // console.log(sorted)
    }
  }, [products])


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold hover:text-[#FF6154] transition-colors duration-300 ease-in-out cursor-pointer mb-4">Top Trending Products</h1>
      <div className="flex flex-col gap-1">
        {
          sortedProducts.slice(0, 5).map((product) => <Cart key={product.name} product={product} />)
        }
      </div>
      <button className="btn rounded-full w-full">View All</button>
    </div>
  );
};

export default TrendingProduct;

const Cart = ({ product }) => {
  const { _id, name, description, upvotes, reviews } = product;
  return (
    <div className="bg-white hover:bg-gray-50 rounded-2xl flex flex-col gap-1.5 py-4 px-2.5 transition-all duration-200 ease-in-out">
      <div className="flex items-center gap-2.5">
        <img src="https://picsum.photos/500" className="size-5 rounded object-cover" />
        <Link to={`products/${_id}`} className="text-sm text-gray-500 cursor-pointer hover:text-[#FF6154] font-medium transition-colors duration-300">/{name}</Link>
      </div>
      {
        description.length > 140 ?
          <p className="text-[#344054]">{description.slice(0, 140)}... <Link className="text-amber-700 hover:underline" to={`/products/${_id}`}>View More</Link></p>
          :
          <p className=" text-[#344054]">{description}</p>
      }
      <section className="flex items-center gap-1.5  text-sm">
        <PiTriangle className="border rounded font-bold" />
        <p className="font-semibold text-gray-700">Upvote ({upvotes?.length})</p>
        <BsDot className="mx-1.5" />
        <FaRegComment />
        <p className="font-semibold text-gray-700">{reviews?.length || 0}</p>
      </section>
    </div>
  )
}
