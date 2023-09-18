import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

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
      className="carousel-button-group gap-3 mt-2 md:mt-0
      flex w-full justify-end  md:absolute md:top-[50%] md:translate-y-[-50%] md:justify-between"
    >
      <button
        className="relative md:left-[-2rem] text-gray-400 hover:text-white transition"
        onClick={() => previous()}
      >
        <ChevronLeftIcon size={20} />
      </button>
      <button
        className="relative md:right-[-2rem]  text-gray-400 hover:text-white transition"
        onClick={() => next()}
      >
        <ChevronRightIcon size={20} />
      </button>
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};

export default function ScrollBar({ children }: Props) {
  return (
    <div className="relative">
      <Carousel
        className="h-[8vw]"
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
