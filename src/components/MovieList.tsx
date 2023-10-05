"use client";
import MovieCard from "./MovieCard";
import { Content } from "@/model/Content";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PlayIcon from "./ui/icons/PlayIcon";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import "swiper/css";

import { useRef } from "react";

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
    <section>
      {movies ? (
        <div>
          <div className="flex justify-between py-1 px-[4%]">
            <h3 className="text-[#E5E5E5] text-sm md:text-md lg:text-lg xl:text-xl">
              Title
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
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <SwiperSlide key={num}>
                  <Image
                    key={num}
                    className="w-full aspect-[16/10] rounded-sm p-px flex-grow-0 flex-shrink-0"
                    src={`https://via.placeholder.com/210/00FF00?text=slide${num}`}
                    alt=""
                    width={150}
                    height={150}
                  />
                </SwiperSlide>
              ))}
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
    </section>
  );
}
