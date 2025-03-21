import Cart from "./Cart";
import useProducts from "../hooks/useProducts";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const { products } = useProducts()
  const [featuredProducts, setFeaturedProducts] = useState([])
  
  useEffect(() => {
    if (products) {
      const featured = products.filter(product => product.isFeatured === true)
      setFeaturedProducts(featured)
    }
  }, [products])

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-black font-semibold text-2xl mb-6 ml-10">Featured Products on Tech Hunt</h1>
      {
        featuredProducts.map((cart, index) => <Cart key={cart.name} cart={cart} index={index} />)
      }
    </div>
  );
};

export default FeaturedProducts;