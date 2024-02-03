import Carousel from "react-bootstrap/Carousel";
import "./PatientHomeCarousel.css";
import IMG1 from "../../assets/images/carouselImg1.svg";
function PatientHomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={100000}>
        <img className="d-block w-100" src={IMG1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item interval={100000}>
        <img className="d-block w-100" src={IMG1} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={IMG1} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default PatientHomeCarousel;
