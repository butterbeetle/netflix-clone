"use client";
import Image from "next/image";
import { useState } from "react";

export default function TestListt() {
  const [index, setIndex] = useState(0);

  const offset = 3;

  const sliderList = document.querySelector("#slider");
  return (
    <section>
      <div className="flex justify-between py-1 px-[4%]">
        <h3 className="text-[#E5E5E5] text-sm md:text-md lg:text-lg xl:text-xl">
          Title
        </h3>
        <div className="flex gap-[1px] items-center transition">
          <div className="bg-[#4d4d4d] w-[12px] h-[2px]" />
          <div className="bg-[#aaa] w-[12px] h-[2px]" />
          <div className="bg-[#4d4d4d] w-[12px] h-[2px]" />
          <div className="bg-[#4d4d4d] w-[12px] h-[2px]" />
          <div className="bg-[#4d4d4d] w-[12px] h-[2px]" />
        </div>
      </div>
      <div className="group/visible w-full flex justify-center">
        <button
          className="w-[4%] bg-black/50 z-[2] m-px ml-0
        group/chevron
      group-hover/visible:bg-black/75
      "
        >
          <div
            className="flex justify-center items-center text-white transition 
          opacity-0
        text-3xl md:text-4xl lg:text-5xl xl:text-7xl
        group-hover/chevron:scale-125
        group-hover/visible:opacity-100"
          >
            &#8249;
          </div>
        </button>
        <div
          className="relative w-[92%] flex transition -translate-x-[100%]"
          id="slider"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <Image
              key={num}
              className="aspect-[16/10] rounded-sm p-px
            flex-grow-0 flex-shrink-0
            basis-1/3 sm:w-1/3 
            md:basis-1/4 md:w-1/4 
            lg:basis-1/5 lg:w-1/5 
            xl:basis-1/6 xl:w-1/6"
              src={`https://via.placeholder.com/210/00FF00?text=slide${num}`}
              alt=""
              width={150}
              height={150}
            />
          ))}
        </div>
        <button
          className="w-[4%] bg-black/50 z-[2] m-px mr-0
        group/chevron
      group-hover/visible:bg-black/75
      "
        >
          <div
            className="flex justify-center items-center text-white transition 
        opacity-0
        text-3xl md:text-4xl lg:text-5xl xl:text-7xl
        group-hover/chevron:scale-125
        group-hover/visible:opacity-100"
          >
            &#8250;
          </div>
        </button>
      </div>
    </section>
  );
}
