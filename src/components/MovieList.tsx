"use client";

import { Content } from "@/model/Content";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PlayIcon from "./ui/icons/PlayIcon";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import "swiper/css";

import React, { useEffect, useRef, useState } from "react";
import { genreConversionToString } from "@/util/converter";
import PlusIcon from "./ui/icons/PlusIcon";
import ModalPortal from "./ui/ModalPortal";
import PreviewModal from "./PreviewModal";

interface Props {
  title: string;
  type: string;
  category: string;
  genres?: string | null;
}
export default function MovieList({ title, type, category, genres }: Props) {
  const swiperRef = useRef<any | null>(null);

  const { data: movies } = useSWR<Content[]>(
    `/api/tmdb/${type}/${category}/${genres ?? null}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div className="relative mb-8">
      {true ? (
        <div>
          <div className="flex justify-between py-1 px-[4%]">
            <h3 className="text-[#E5E5E5] text-sm md:text-md lg:text-lg xl:text-xl">
              {title}
            </h3>
          </div>
          <div className="group/visible w-full flex justify-center">
            <button
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="w-[4%] bg-black/50 z-[2] m-0
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
            <Swiper
              ref={swiperRef}
              modules={[Pagination]}
              className="relative w-[92%] flex transition"
              lazyPreloadPrevNext={6}
              loop={true}
              slidesPerView={3}
              slidesPerGroup={3}
              speed={1000}
              spaceBetween={0}
              breakpoints={{
                800: { slidesPerView: 4, slidesPerGroup: 4 },
                1100: { slidesPerView: 5, slidesPerGroup: 5 },
                1400: { slidesPerView: 6, slidesPerGroup: 6 },
              }}
              pagination={{
                clickable: true,
              }}
              slideVisibleClass="swiper-visible"
            >
              {movies?.map(
                ({
                  title,
                  id,
                  backdrop_path,
                  genre_ids,
                  release_date,
                  first_air_date,
                  vote_average,
                  name,
                }) => (
                  <SwiperSlide className="relative group hover:z-10" key={id}>
                    <Image
                      className="w-full aspect-[16/10] rounded-sm p-px flex-grow-0 flex-shrink-0"
                      src={`${tmdbImageURL}/w300/${backdrop_path}`}
                      alt=""
                      width={150}
                      height={150}
                      priority
                    />
                    <div
                      className={`absolute top-0 w-full h-full opacity-0 scale-0 
                    transition-all duration-500 ease-in-out delay-100 cursor-pointer
                    group-hover:opacity-100
                    group-hover:scale-[1.2]
                    group-hover:-translate-y-12
                    `}
                    >
                      <Image
                        className="w-full aspect-[16/9] rounded-md rounded-b-none"
                        src={`${tmdbImageURL}/w300/${backdrop_path}`}
                        alt=""
                        width={150}
                        height={150}
                      />
                      <div
                        className="h-auto shadow-lg
                      z-10 bg-zinc-800 absolute w-full transition rounded-b-md -mt-1 p-2"
                      >
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 bg-white rounded-full flex mb-2
                      justify-center items-center transition hover:bg-neutral-300"
                          >
                            <PlayIcon size={15} />
                          </div>
                          <div
                            className="w-6 h-6 bg-black/10 rounded-full flex mb-2 border-gray-500 border-2 text-white
                      justify-center items-center transition hover:border-white"
                          >
                            <PlusIcon />
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-1">
                            <p className="text-white text-[10px]">
                              {title || name}
                            </p>
                            <p className="text-white text-[10px]">
                              ⭐{vote_average.toFixed(1)}
                            </p>
                          </div>
                          <p className="text-[#46D369] text-[10px]">
                            {release_date || first_air_date}
                          </p>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="text-white text-[10px] lg:text-sm">
                            {genreConversionToString(genre_ids).map(
                              (genre, index) => (
                                <p className="inline-block" key={index}>{`${
                                  index === 0 ? genre : "•" + genre
                                }`}</p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <button
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="w-[4%] bg-black/50 z-[2] m-0
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
        </div>
      ) : null}
      <ModalPortal>
        <PreviewModal />
      </ModalPortal>
    </div>
  );
}
