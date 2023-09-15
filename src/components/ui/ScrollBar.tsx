import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 800 },
    items: 6,
    slidesToSlide: 3,
  },

  mobile: {
    breakpoint: { max: 800, min: 0 },
    items: 3,
    slidesToSlide: 3,
  },
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  return (
    <div
      className="carousel-button-group 
      flex w-full justify-end items-center md:absolute md:top-[50%] md:translate-y-[-50%] md:justify-between"
    >
      <button
        className="relative md:left-[-2rem] text-gray-400 hover:text-white transition"
        onClick={() => previous()}
      >
        <FiChevronLeft size={30} />
      </button>
      <button
        className="relative md:right-[-2rem]  text-gray-400 hover:text-white transition"
        onClick={() => next()}
      >
        <FiChevronRight size={30} />
      </button>
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};

export default function ScrollBar({ children }: Props) {
  return (
    <div className="relative ">
      <Carousel
        responsive={responsive}
        infinite
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {children}
      </Carousel>
    </div>
  );
}
