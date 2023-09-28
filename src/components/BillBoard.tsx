"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import InfoCircleIcon from "./ui/icons/InfoCircleIcon";
import Spinner from "./ui/Spinner";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";

export default function BillBoard() {
  const { data: movie, isLoading } = useSWR(`/api/trending/movies/`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className="relative">
      <div className="relative h-[40vw]">
        {isLoading && (
          <p className="absolute text-white top-[30%] left-[50%] translate-x-[-50%]">
            <Spinner color={"red"} />
          </p>
        )}
        {!isLoading && (
          <div className="relative w-full h-full">
            <div className="absolute w-full h-full  bg-gradient-to-t from-zinc-900 to-zinc-900/10 z-[1]" />
            <Image
              className="object-cover"
              src={`${tmdbImageURL}/${movie.backdrop_path}`}
              alt="thumbnail"
              fill
              sizes="150"
              priority
            />
            <div className="absolute top-[20%] ml-6 md:ml-12 z-[1]">
              <p
                className="
            text-white 
            text-md md:text-2xl lg:text-3xl 
            h-full w-[50%] 
            font-bold 
            drop-shadow-xl
            "
              >
                {movie?.title}
              </p>
              <p
                className="
            text-white
            text-[10px] md:text-[11px] lg:text-[12px]
            mt-3
            w-[40%]
            drop-shadow-xl
            "
              >
                {movie?.overview}
              </p>
              <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                <button
                  className="
                bg-white/30
                text-white
                rounded-md
                py-[2px]
                px-2
                w-auto
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-opacity-20
                transition
              "
                >
                  <InfoCircleIcon className="mr-1" />
                  <p
                    className="
                text-[10px] md:text-md"
                  >
                    상세 정보
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
