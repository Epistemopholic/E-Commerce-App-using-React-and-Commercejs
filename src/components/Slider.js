import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Slider.css";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="slider-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={2000}
        variant="dark"
      >
        <Carousel.Item>
          <img
            className="w-100"
            src={require("../assets/img-1.webp")}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-100"
            src={require("../assets/img-2.webp")}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-100"
            src={require("../assets/img-3.webp")}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-100"
            src={require("../assets/img-4.webp")}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slider;
