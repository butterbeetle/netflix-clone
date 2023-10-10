"use client";

import { Content } from "@/model/Content";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PlayIcon from "./ui/icons/PlayIcon";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import "swiper/css";

import React, { useEffect, useRef, useState } from "react";
import { genreConversionToString } from "@/util/converter";
import PlusIcon from "./ui/icons/PlusIcon";
import ModalPortal from "./ui/ModalPortal";
import CloseIcon from "./ui/icons/CloseIcon";

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
    <div className="relative mb-8">
      {true ? (
        <div>
          <div className="flex justify-between py-1 px-[4%]">
            <h3 className="text-[#E5E5E5] text-sm md:text-md lg:text-lg xl:text-xl">
              {title}
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
                }) => (
                  <SwiperSlide className="relative group hover:z-10" key={id}>
                    <Image
                      className="w-full aspect-[16/10] rounded-sm p-px flex-grow-0 flex-shrink-0"
                      src={`${tmdbImageURL}/w300/${backdrop_path}`}
                      alt=""
                      width={150}
                      height={150}
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
                        className="w-full aspect-[16/9] rounded-md rounded-b-none"
                        src={`${tmdbImageURL}/w300/${backdrop_path}`}
                        alt=""
                        width={150}
                        height={150}
                      />
                      <div
                        className="h-auto shadow-lg
                      z-10 bg-zinc-800 absolute w-full transition rounded-b-md -mt-1 p-2"
                      >
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 bg-white rounded-full flex mb-2
                      justify-center items-center transition hover:bg-neutral-300"
                          >
                            <PlayIcon size={15} />
                          </div>
                          <div
                            className="w-6 h-6 bg-black/10 rounded-full flex mb-2 border-gray-500 border-2 text-white
                      justify-center items-center transition hover:border-white"
                          >
                            <PlusIcon />
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-1">
                            <p className="text-white text-[10px]">
                              {title || name}
                            </p>
                            <p className="text-white text-[10px]">
                              ⭐{vote_average.toFixed(1)}
                            </p>
                          </div>
                          <p className="text-[#46D369] text-[10px]">
                            {release_date || first_air_date}
                          </p>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="text-white text-[10px] lg:text-sm">
                            {genreConversionToString(genre_ids).map(
                              (genre, index) => (
                                <p className="inline-block" key={index}>{`${
                                  index === 0 ? genre : "•" + genre
                                }`}</p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
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
      <ModalPortal>
        <div className="absolute w-full h-full top-0 left-0 z-50 bg-neutral-900/50 flex justify-center">
          <div className="absolute top-8 min-w-[456px] w-[90%] md:min-w-[750px] md:max-w-[890px] ">
            <div className="absolute z-10 right-0 m-4 cursor-pointer w-fit p-2 text-xl rounded-full bg-black text-white">
              <CloseIcon />
            </div>
            <div className="relative w-full h-1/3">
              <div className="absolute w-full h-full bg-gradient-to-t from-[#181818] to-[#181818]/10"></div>
              <Image
                className="w-full aspect-[16/9] rounded-t-md"
                src={`http://via.placeholder.com/300/FF000/white.png?text=Test`}
                width={100}
                height={100}
                alt="placeholder"
              />
            </div>
            <div className="bg-[#181818] px-10 pt-2 pb-8">
              <div className="flex gap-8 mb-12">
                <div className="w-2/3 text-white text-sm">
                  <p className="text-xl mb-2">Title</p>
                  1956년, 프랑스의 한 성당에서 신부가 끔찍하게 살해당한다. 이
                  사건을 조사하기 위해 파견된 아이린 수녀는 4년 전 자신을 공포에
                  떨게 했던 악마의 기운을 느낀다. 어두운 밤, 계속해서 일어나는
                  의문의 사건들 가운데 충격적인 진실이 드러나는데…
                </div>
                <div className="w-1/3 text-sm cursor-pointer">
                  <div className="mb-3">
                    <p className="text-[#777777] inline mr-1 cursor-default">
                      출연:
                    </p>
                    <p className="text-white inline hover:underline">나,</p>
                    <p className="text-white inline hover:underline">너,</p>
                    <p className="italic text-white inline hover:underline">
                      더 보기
                    </p>
                  </div>
                  <div>
                    <p className="text-[#777777] inline mr-1 cursor-default">
                      장르:
                    </p>
                    <p className="text-white inline hover:underline">액션,</p>
                    <p className="text-white inline hover:underline">판타지,</p>
                  </div>
                </div>
              </div>
              <div className="mb-12">
                <div className="text-white mb-1">
                  <div className="text-2xl mb-5">관련 영상</div>
                </div>
                <div className="text-[#4d4d4d]">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div
                      key={num}
                      className="min-h-[10rem] p-4 relative cursor-pointer rounded
                  flex items-center
                  border border-x-0
                  border-t-[#404040]
                  border-b-[#404040]"
                    >
                      {num}회
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-12">
                <div className="text-white">
                  <div className="text-2xl mb-5">추천 콘텐츠</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
                      <Image
                        className="aspect-[15/7] object-cover w-full rounded-t-md"
                        src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
                        width={100}
                        height={100}
                        alt="placeholder"
                      />
                      <div className="flex justify-between p-4">
                        <div className="text-base">2021</div>
                        <div>Icon</div>
                      </div>
                      <div className="text-sm px-4">
                        지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게
                        반목하는 두 쌍둥이 도시에서, 두 자매가 서로 반대편에
                        서서 싸우기에 이른다. 마법 기술과 신념의 충돌 속에서
                        전쟁이 시작된다.
                      </div>
                    </div>
                    <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
                      <Image
                        className="aspect-[15/7] object-cover w-full rounded-t-md"
                        src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
                        width={100}
                        height={100}
                        alt="placeholder"
                      />
                      <div className="flex justify-between p-4">
                        <div className="text-base">2021</div>
                        <div>Icon</div>
                      </div>
                      <div className="text-sm px-4">
                        지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게
                        반목하는 두 쌍둥이 도시에서, 두 자매가 서로 반대편에
                        서서 싸우기에 이른다. 마법 기술과 신념의 충돌 속에서
                        전쟁이 시작된다.
                      </div>
                    </div>
                    <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
                      <Image
                        className="aspect-[15/7] object-cover w-full rounded-t-md"
                        src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
                        width={100}
                        height={100}
                        alt="placeholder"
                      />
                      <div className="flex justify-between p-4">
                        <div className="text-base">2021</div>
                        <div>Icon</div>
                      </div>
                      <div className="text-sm px-4">
                        지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게
                        반목하는 두 쌍둥이 도시에서, 두 자매가 서로 반대편에
                        서서 싸우기에 이른다. 마법 기술과 신념의 충돌 속에서
                        전쟁이 시작된다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-12">
                <div className="text-white">
                  <div className="text-2xl mb-5">비슷한 콘텐츠</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
                      <Image
                        className="aspect-[15/7] object-cover w-full rounded-t-md"
                        src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
                        width={100}
                        height={100}
                        alt="placeholder"
                      />
                      <div className="flex justify-between p-4">
                        <div className="text-base">2021</div>
                        <div>Icon</div>
                      </div>
                      <div className="text-sm px-4">
                        지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게
                        반목하는 두 쌍둥이 도시에서, 두 자매가 서로 반대편에
                        서서 싸우기에 이른다. 마법 기술과 신념의 충돌 속에서
                        전쟁이 시작된다.
                      </div>
                    </div>
                    <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
                      <Image
                        className="aspect-[15/7] object-cover w-full rounded-t-md"
                        src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
                        width={100}
                        height={100}
                        alt="placeholder"
                      />
                      <div className="flex justify-between p-4">
                        <div className="text-base">2021</div>
                        <div>Icon</div>
                      </div>
                      <div className="text-sm px-4">
                        지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게
                        반목하는 두 쌍둥이 도시에서, 두 자매가 서로 반대편에
                        서서 싸우기에 이른다. 마법 기술과 신념의 충돌 속에서
                        전쟁이 시작된다.
                      </div>
                    </div>
                    <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
                      <Image
                        className="aspect-[15/7] object-cover w-full rounded-t-md"
                        src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
                        width={100}
                        height={100}
                        alt="placeholder"
                      />
                      <div className="flex justify-between p-4">
                        <div className="text-base">2021</div>
                        <div>Icon</div>
                      </div>
                      <div className="text-sm px-4">
                        지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게
                        반목하는 두 쌍둥이 도시에서, 두 자매가 서로 반대편에
                        서서 싸우기에 이른다. 마법 기술과 신념의 충돌 속에서
                        전쟁이 시작된다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalPortal>
    </div>
  );
}
