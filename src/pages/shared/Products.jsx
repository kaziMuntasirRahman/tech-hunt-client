import { FiTriangle } from "react-icons/fi";
import DisplayRating from "../../components/DisplayRating";
import useProducts from "../../hooks/useProducts";
import { BsDot, BsTags } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Products = () => {
  const { products } = useProducts()
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-600 text-4xl text-center">All Products Appear Here.</h1>
      {
        products.map((product) =>
          <ProductCart key={product.name} product={product} />
        )
      }
    </div>
  );
};

export default Products;

const ProductCart = ({ product }) => {

  const { _id, name, description, reviews, upvotes, tags, productOwner } = product;
  const [averageRating, setAverageRating] = useState(0)

  useEffect(()=>{
    let totalCount = reviews.reduce((total, review)=>total+review.rating, 0)
    setAverageRating((totalCount/reviews.length).toFixed(1))
  }, [reviews])

  return (
    <Link to={`/products/${_id}`} className="flex flex-col gap-3 p-6 border-b border-slate-100 rounded-2xl hover:bg-gray-100 transition-all ease-in-out group">
      <h1 className="text-2xl font-medium mb-6 group-hover:text-amber-700">{name}</h1>
      <div className="flex items-center gap-2.5 mb-5">
        <img className="size-12 rounded-full object-cover" src={productOwner.image} alt="" />
        <p className="text-lg font-semibold hover:underline cursor-pointer tooltip" data-tip="Product Owner">{productOwner.name}</p>
      </div>
      <section className="flex items-center justify-between mb-3">
        <div id="tags" className="flex items-center gap-2">
          <BsTags />
          <p className="hover:underline cursor-pointer">{tags[0]}</p>
          <BsDot />
          <p className="hover:underline cursor-pointer">{tags[1]}</p>
          <BsDot />
          <p className="hover:underline cursor-pointer">{tags[2]}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="border border-gray-100 rounded-lg p-1 px-2 flex items-center gap-2">
            <DisplayRating rating={4.5} /> <p>{`${averageRating} (${reviews.length})`}</p>
          </div>
          <div className="border bg-amber-300 border-gray-100 rounded-lg p-1 px-2 flex items-center gap-2">
            <FiTriangle /> <p>{upvotes.length} upvotes</p>
          </div>
        </div>
      </section>
      <h1 className="text-lg font-medium  group-hover:text-amber-700">{name}</h1>
      {/* <p>{description.length > 300 ? `${description.slice(0, 300)}....` : description}</p> */}
      <p>{description}</p>
    </Link>
  )
}