"use client";

import { Content } from "@/model/Content";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import "swiper/css";

import React, { useRef } from "react";
import MovieListCard from "./MovieListCard";

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
    <div className=" mb-8">
      {true ? (
        <div>
          <div className="flex justify-between py-1 px-[4%]">
            <h3 className="text-[#E5E5E5] text-sm md:text-base lg:text-lg xl:text-xl">
              {title}
            </h3>
          </div>
          <div className="group/visible w-full flex justify-center">
            <button
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="w-[4%] bg-black/50 z-[2] m-0 opacity-0 transition-all duration-500
              group-hover/visible:opacity-100
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
              className="relative w-[92%] flex transition peer"
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
                  overview,
                }) => (
                  <SwiperSlide className="relative group hover:z-10" key={id}>
                    <MovieListCard
                      id={id}
                      title={title}
                      backdrop_path={backdrop_path}
                      genre_ids={genre_ids}
                      release_date={release_date}
                      first_air_date={first_air_date}
                      vote_average={vote_average}
                      overview={overview}
                      name={name}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <button
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="w-[4%] bg-black/50 z-[2] m-0 opacity-0 transition-all duration-500
              group-hover/visible:opacity-100
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
    </div>
  );
}
