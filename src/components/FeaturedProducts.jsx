import { useEffect, useState } from "react";
import Cart from "./Cart";

const FeaturedProducts = () => {
  const [carts, setCarts] = useState([])

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setCarts(data))
  }, [])

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-black font-semibold text-2xl mb-6">Featured Products on Tech Hunt</h1>
      {
        carts.map((cart, index) => <Cart key={cart.name} cart={cart} index={index} />)
      }
    </div>
  );
};

export default FeaturedProducts;