import FeaturedProducts from "../../components/FeaturedProducts";
import Slider from "../../components/Slider";
import TrendingProduct from "../../components/TrendingProduct";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <div>
      <Slider />
      <div className="grid grid-cols-1 md:grid-cols-3 my-8 gap-5">
        <section className="col-span-2 bg-indigo-400/0">
          <FeaturedProducts />
        </section>
        <section className="bg-green-400/0 mx-auto ">
          <TrendingProduct />
        </section>
        <section className="col-span-full">
          <Reviews />
        </section>
      </div>
    </div>
  );
};

export default Home;