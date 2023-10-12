import { makeYoutubeLink } from "@/service/tmdb";
import ReactPlayer from "react-player";
import PlusIcon from "./ui/icons/PlusIcon";
import PlayIcon from "./ui/icons/PlayIcon";
import { useState } from "react";
import Volume from "./ui/Volume";

type Props = {
  videoKey: string;
};

export default function PreviewModalVideo({ videoKey }: Props) {
  const [isMuted, setIsMuted] = useState(true);
  return (
    <div className="relative w-full aspect-[16/9] rounded-t-md  cursor-pointer">
      <div
        className="absolute bottom-0 w-full h-1/2 
      bg-gradient-to-t from-[#181818] to-[#181818]/10
      flex items-center px-16 "
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-sm flex items-center hover:bg-white/80 transition gap-1">
              <div className="inline-block ">
                <PlayIcon size={15} />
              </div>
              <p className="inline-block text-[10px]">재생</p>
            </div>
            <div
              className="w-8 h-8 bg-black/10 rounded-full flex 
          border-gray-500 border-2 text-white
            justify-center items-center transition hover:border-white"
            >
              <PlusIcon />
            </div>
          </div>
          <div
            onClick={() => setIsMuted((prev) => !prev)}
            className="w-8 h-8 bg-black/10 rounded-full flex 
          border-gray-500 border-2 text-gray-500
            justify-center items-center transition hover:border-white hover:text-white
            "
          >
            <Volume isMuted={isMuted} />
          </div>
        </div>
      </div>
      <ReactPlayer
        url={makeYoutubeLink(videoKey)}
        width="100%"
        height="100%"
        playing={true}
        muted={isMuted}
        loop={true}
      />
    </div>
  );
}
