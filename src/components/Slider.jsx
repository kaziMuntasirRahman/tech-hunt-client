import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
    return (
        <div className="my-10">
            <Carousel showArrows={true} axis="horizontal" centerMode={false} infiniteLoop={true} autoPlay={true} interval={10000} swipeable={true} transitionTime={1500} >
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) =>
                        <div key={item}>
                            <img src={`/assets/images/banner slider/${item}.png`}  />
                            {/* <p className="legend">Legend {item}</p> */}
                        </div>
                    )
                }
            </Carousel>
        </div>
    );
};

export default Slider;