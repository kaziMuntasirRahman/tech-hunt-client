import FeaturedProducts from "../../components/FeaturedProducts";
import Slider from "../../components/Slider";
import TrendingProduct from "../../components/TrendingProduct";

const Home = () => {
  return (
    <div>
      {/* <Slider /> */}
      <div className="grid grid-cols-4 my-8">
        <section className="col-span-3 bg-indigo-400/0">
          <FeaturedProducts />
        </section>
        <section className="bg-green-400/0">
          <TrendingProduct />
        </section>
      </div>
    </div>
  );
};

export default Home;