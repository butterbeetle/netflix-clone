import MovieCard from "./MovieCard";
import { nowplayingMovie } from "@/model/movie";
import ChevronLeftIcon from "./ui/icons/ChevronLeftIcon";
import ChevronRightIcon from "./ui/icons/ChevronRightIcon";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import PlayIcon from "./ui/icons/PlayIcon";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";

interface Props {
  title: string;
  category: string;
}
export default function MovieList({ title, category }: Props) {
  const { data: movies } = useSWR<nowplayingMovie[]>(
    `/api/movie/${category}/`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  return (
    <>
      {movies ? (
        <div className="px-6 md:px-12 my-4">
          <p className="text-[#E5E5E5] text-[12px] font-semibold mb-2">
            {title}
          </p>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            slidesPerView={3}
            spaceBetween={0}
            breakpoints={{
              800: { slidesPerView: 4, spaceBetween: 5 },
              1100: { slidesPerView: 5, spaceBetween: 5 },
              1400: { slidesPerView: 6, spaceBetween: 5 },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} className=" relative">
                <div className="peer relative w-full h-[17vw]  md:h-[13vw] lg:h-[8vw]">
                  <Image
                    className="object-cover"
                    src={`${tmdbImageURL}/${movie.backdrop_path}`}
                    alt="thumbnail"
                    fill
                    sizes="150"
                  />
                </div>
                {/* <div
                  className="transition duration-300 z-[20] absolute top-0 opacity-0
                            delay-200 w-full
                            hover:scale-150
                            hover:opacity-100
                            drop-shadow-md select-none"
                >
                  <div className="relative w-full h-[17vw]  md:h-[13vw] lg:h-[8vw]">
                    <Image
                      className="object-cover rounded-t-md w-full"
                      src={`${tmdbImageURL}/${movie.backdrop_path}`}
                      alt="thumbnail"
                      fill
                      sizes="150"
                    />
                  </div>
                  <div className="relative z-[20] bg-zinc-800 p-2 lg:p-4 w-full transition shadow-md rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                      <div
                        className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex
                           justify-center items-center transition hover:bg-neutral-300"
                      >
                        <PlayIcon size={20} />
                      </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                      New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                      <p className="text-white text-[10px] lg:text-sm">abc</p>
                    </div>
                  </div>
                </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
}
