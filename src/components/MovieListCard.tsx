import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import PlayIcon from "./ui/icons/PlayIcon";

import "swiper/css";

import React, { useState } from "react";
import { genreConversionToString } from "@/util/converter";
import PlusIcon from "./ui/icons/PlusIcon";

import ModalPortal from "./ui/ModalPortal";
import PreviewModal from "./PreviewModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  title: string;
  backdrop_path: string;
  genre_ids: number[];
  release_date: string;
  first_air_date: string;
  vote_average: number;
  overview: string;
  name: string;
};

export default function MovieListCard({
  id,
  title,
  genre_ids,
  overview,
  backdrop_path,
  release_date,
  first_air_date,
  vote_average,
  name,
}: Props) {
  return (
    <div>
      <Image
        className="w-full aspect-video p-px "
        src={`${tmdbImageURL}/w300/${backdrop_path}`}
        alt="list"
        width={150}
        height={150}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
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
          className="w-full aspect-video rounded-md rounded-b-none"
          src={`${tmdbImageURL}/w300/${backdrop_path}`}
          alt=""
          width={150}
          height={150}
        />
        <div
          className="h-auto shadow-lg
  z-10 bg-zinc-800 absolute w-full transition rounded-b-md -mt-1 p-2"
        >
          <Link as={`/browse?id=${id}`} href={`/browse/${id}`} scroll={false}>
            <div className="relative">
              {/* <div className="absolute top-0 flex gap-2 w-fit">
                <Link
                  href={`/watch/${1}`}
                  className="w-6 h-6 bg-white rounded-full flex mb-2
    justify-center items-center transition hover:bg-neutral-300"
                >
                  <PlayIcon size={15} />
                </Link>
                <div
                  className="w-6 h-6 bg-black/10 rounded-full flex mb-2 border-gray-500 border-2 text-white
    justify-center items-center transition hover:border-white"
                >
                  <PlusIcon />
                </div>
              </div> */}
              <div>
                <div className="flex gap-1">
                  <p className="text-white text-[10px] md:text-[12px] lg:text-sm">
                    {title || name}
                  </p>
                  <p className="text-white text-[10px] md:text-[12px] lg:text-sm">
                    ⭐{vote_average.toFixed(1)}
                  </p>
                </div>
                <p className="text-[#46D369] text-[10px] md:text-[12px] lg:text-sm">
                  {release_date || first_air_date}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <div className="text-white text-[10px] md:text-[12px] lg:text-sm">
                  {genreConversionToString(genre_ids).map((genre, index) => (
                    <p className="inline-block" key={index}>{`${
                      index === 0 ? genre : "•" + genre
                    }`}</p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
