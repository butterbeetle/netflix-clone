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
          <p className="text-white text-sm font-semibold mb-2">{title}</p>
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
              <SwiperSlide key={movie.id}>
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
                  className="bg-red-500 absolute top-0 transition duration-200 z-10
      delay-300 w-full
      peer-hover:scale-125 peer-hover:-translate-y-[2vw]
      peer-hover:opacity-100
      "
                >
                  <div>
                    <Image
                      className="
          cursor-pointer
          object-cover
          transition duration shadow-xl rounded-t-md 
          w-full h-[12vw]
        "
                      src={`${tmdbImageURL}/${movie.backdrop_path}`}
                      alt="thumbnail"
                      width={200}
                      height={200}
                    />
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
