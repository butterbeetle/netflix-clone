import MovieCard from "./MovieCard";
import { nowplayingMovie } from "@/model/movie";
import ChevronLeftIcon from "./ui/icons/ChevronLeftIcon";
import ChevronRightIcon from "./ui/icons/ChevronRightIcon";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

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
                <div className="w-1/3 h-[17vw] md:w-1/4 md:h-[13vw] lg:w-1/5 lg:h-[8vw]">
                  <Image
                    className="object-cover"
                    src={`${tmdbImageURL}/${movie.backdrop_path}`}
                    alt="thumbnail"
                    fill
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
}
