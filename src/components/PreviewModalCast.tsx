import fetcher from "@/lib/fetcher";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import ChevronDownIcon from "./ui/icons/ChevronDownIcon";
import { ActorContent } from "@/model/Content";
import { tmdbImageURL } from "@/service/tmdb";
import UserIcon from "./ui/icons/UserIcon";

type Props = {
  actorData: ActorContent[];
};

export default function PreviewModalCast({ actorData }: Props) {
  const offset = 6;
  const maxActor = 18;
  const [index, setIndex] = useState(offset);

  const offsetHandler = () => {
    setIndex((prev) => (index >= maxActor ? offset : prev + offset));
  };

  return (
    <div className="mb-12">
      <div className="text-white mb-1">
        <div className="text-2xl mb-5">출연진</div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6  gap-2">
        {actorData
          ?.slice(0, index)
          .map(({ id, name, character, profile_path }) => (
            <div
              key={id}
              className="flex flex-col items-center group cursor-pointer"
            >
              {profile_path ? (
                <Image
                  className="mb-2 aspect-square w-full object-cover"
                  src={`${tmdbImageURL}/w300/${profile_path}`}
                  width={150}
                  height={150}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
                  alt="profile"
                />
              ) : (
                <div
                  className="w-full aspect-square mb-2 object-cover text-8xl
                  flex items-center justify-center
                bg-[#181818]/90 text-gray-500 border-gray-800 border"
                >
                  <UserIcon />
                </div>
              )}
              <div className="text-[12px] text-center line-clamp-2">
                <div className="text-bold text-white group-hover:underline">
                  {name}
                </div>
                <div className="text-[#4d4d4d]">{character}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="relative w-full flex justify-center mt-2">
        <div className="absolute w-full border-b-[#404040] border-b top-1/2"></div>
        <div
          onClick={() => offsetHandler()}
          className={`w-8 h-8 bg-black/10 rounded-full
          border-gray-500 border-2 cursor-pointer
            flex justify-center items-center transition
           hover:border-white hover:text-white
            text-sm text-gray-500 ${
              index === maxActor ? "rotate-180" : "rotate-0"
            }
            `}
        >
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}
