import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
    return (
        <div className="my-8">
            <Carousel showArrows={true} axis="horizontal" centerMode={false} infiniteLoop={true} autoPlay={true} interval={3000} swipeable={true} >
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) =>
                        <div>
                            <img src={`/assets/images/banner slider/${index + 1}.png`} />
                            <p className="legend">Legend {index + 1}</p>
                        </div>
                    )
                }
            </Carousel>
        </div>
    );
};

export default Slider;