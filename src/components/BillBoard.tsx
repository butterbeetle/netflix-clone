"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import InfoCircleIcon from "./ui/icons/InfoCircleIcon";
import Spinner from "./ui/Spinner";

export default function BillBoard() {
  const { data, isLoading } = useSWR("/api/random/", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  console.log(data);
  return (
    <div className="relative">
      <div className="relative h-[56.25vw]">
        {isLoading && (
          <p className="absolute text-white top-[40%] left-[50%] translate-x-[-50%]">
            <Spinner color={"red"} />
          </p>
        )}
        {!isLoading && (
          <>
            <video
              className="w-full h-[56.25vw] object-cover brightness-[60%]"
              autoPlay
              muted
              loop
              poster={data[0]?.thumbnailUrl}
              src={data[0]?.videoUrl}
            />
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 z-10">
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
                {data[0]?.title}
              </p>
              <p
                className="
            text-white
            text-[8px]
            md:text-lg
            mt-3
            md:mt-8
            w-[90%]
            md:w-[80%]
            lg:w-[50%]
            drop-shadow-xl
            "
              >
                {data[0]?.description}
              </p>
              <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                <button
                  className="
                bg-white/30
                text-white
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs lg;text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-opacity-20
                transition
              "
                >
                  <InfoCircleIcon className="mr-1" />
                  More Info
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}