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
      <div className="relative h-[50vw]">
        {isLoading && (
          <p className="absolute text-white top-[40%] left-[50%] translate-x-[-50%]">
            <Spinner color={"red"} />
          </p>
        )}
        {!isLoading && (
          <div className="relative w-full h-full">
            <Image
              className="object-cover bg-gradient-to-b from-zinc-700 "
              src={`${tmdbImageURL}/${movie.backdrop_path}`}
              alt="thumbnail"
              fill
              sizes="150"
              priority
            />
            <div className="absolute top-[20%]  ml-4 md:ml-16 z-10">
              <p
                className="
            text-white 
            text-1xl
            md:text-5xl 
            h-full 
            w-[50%] 
            lg:text-6xl 
            font-bold 
            drop-shadow-xl
            "
              >
                {movie?.title}
              </p>
              <p
                className="
            text-white
            text-[8px]
            md:text-md
            lg:text-lg
            mt-3
            md:mt-8
            w-[90%]
            lg:w-[50%]
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
                py-1
                px-2 md:px-4
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-opacity-20
                transition
              "
                >
                  <InfoCircleIcon className="mr-1" />
                  상세 정보
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
