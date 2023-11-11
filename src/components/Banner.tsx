"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import InfoCircleIcon from "./ui/icons/InfoCircleIcon";
import Spinner from "./ui/Spinner";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { BannerContent } from "@/model/Content";

export default function Banner() {
  const { data: movie, isLoading } = useSWR<BannerContent>(
    `/api/tmdb/movie/now_playing/banner`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <>
      {isLoading && (
        <div className="relative w-full h-[57vw]">
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <Spinner color={"white"} />
            <p className="text-white text-sm">데이터를 불러오고 있습니다...</p>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="relative w-full h-[57vw] ">
          <div className="absolute w-full h-full  bg-gradient-to-t from-[#141414] to-[#141414]/10 z-[1]" />
          <Image
            className="w-full h-full aspect-video"
            src={`${tmdbImageURL}/w1280/${movie!.backdrop_path}`}
            alt="thumbnail"
            width={1280}
            height={1280}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
            priority
          />
          <div className="absolute bottom-[15vw] lg:bottom-[20vw] ml-6 md:ml-12 z-[1]">
            <p
              className="
            text-white 
            text-base md:text-6xl 
            h-full w-[50%] lg:w-[70%]
            font-bold 
            drop-shadow-xl
            "
            >
              {movie!.title}
            </p>
            <p
              className="
            text-white
            text-base lg:text-2xl
            mt-3
            w-[50%] 
            drop-shadow-xl
            line-clamp-3 lg:line-clamp-5
            "
            >
              {movie!.overview}
            </p>
            <div
              className="flex flex-row items-center mt-3 md:mt-4 gap-3 
                "
            >
              <button
                className="
                bg-white/30
                hover:bg-red
                text-white
                rounded-md
                px-2
                py-1
                w-auto
                font-semibold
                flex
                flex-row
                items-center
                transition
              "
              >
                <InfoCircleIcon className="mr-2" />
                <p
                  className="
                text-base"
                >
                  상세 정보
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
