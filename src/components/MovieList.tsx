import MovieCard from "./MovieCard";
import { Content } from "@/model/Content";
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
  type: string;
  category: string;
  genres?: string | null;
}
export default function MovieList({ title, type, category, genres }: Props) {
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
    <>
      {movies ? (
        <div className="px-6 md:px-12 mt-4 mb-12">
          <p className="text-[#E5E5E5] text-[12px] font-semibold mb-2">
            {title}
          </p>
          <Swiper
            lazyPreloadPrevNext={6}
            modules={[Navigation, Pagination, A11y]}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            slidesPerView={3}
            slidesPerGroup={3}
            speed={1000}
            spaceBetween={0}
            breakpoints={{
              800: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 5 },
              1100: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 5 },
              1400: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 5 },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} className="group bg-[#141414] w-full">
                <div className="relative w-full h-[17vw] md:h-[13vw] lg:h-[8vw]">
                  <Image
                    className="object-cover"
                    src={`${tmdbImageURL}/w300/${movie.backdrop_path}`}
                    alt="thumbnail"
                    fill
                    sizes="150"
                  />
                </div>
                <div
                  className="opacity-0 absolute z-10 top-0 transition duration-200
                             delay-300 w-full scale-0 
                             group-hover:scale-150
                             group-hover:-translate-y-[12vw]
                             group-hover:opacity-100"
                >
                  <Image
                    className="
                    cursor-pointer
                    object-cover
                    transition duration shadow-xl rounded-t-md 
                    w-full"
                    src={`${tmdbImageURL}/w1280/${movie.backdrop_path}`}
                    alt="thumbnail"
                    width={200}
                    height={200}
                  />
                  <div
                    className="z-30 bg-[#171717] p-2 lg:p-4 absolute w-full 
                  transition shadow-md rounded-b-md -mt-1"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div
                        className="cursor-pointer w-5 h-5 
                        bg-white rounded-full 
                        flex justify-center items-center 
                        transition 
                        hover:bg-neutral-300"
                      >
                        <PlayIcon size={10} />
                      </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                      New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
}
