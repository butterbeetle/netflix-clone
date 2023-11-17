"use client";

import { makeYoutubeURL } from "@/service/tmdb";
import ReactPlayer from "react-player";
import PlusIcon from "./ui/icons/PlusIcon";
import PlayIcon from "./ui/icons/PlayIcon";
import { useState } from "react";
import Volume from "./ui/Volume";
import { ModalContentVideo } from "@/model/Content";
import { useRouter } from "next/navigation";
import Spinner from "./ui/Spinner";

type Props = {
  id: string;
  videoKey: string;
};

export default function PreviewModalVideo({ id, videoKey }: Props) {
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const router = useRouter();

  const linkHandler = () => {
    router.push(`/watch?id=${id}&key=${videoKey}`);
    // console.log("push");
  };

  return (
    <div className="relative w-full aspect-video rounded-t-md cursor-pointer bg-black/50">
      <div
        className="absolute w-full h-full
        bg-gradient-to-t from-[#181818] to-[#181818]/10 to-50%
        flex px-16"
      >
        {!videoReady && (
          <div
            className="w-full h-full
        flex flex-col gap-4 justify-center items-center text-white font-bold"
          >
            <Spinner color={"white"} />
            <p>영상을 불러오고 있습니다..</p>
          </div>
        )}
        {videoReady && (
          <div className="relative w-full ">
            <div className="absolute bottom-8 flex justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="py-1 px-2 bg-white rounded-sm flex items-center justify-center hover:bg-white/80 transition gap-1">
                  <div>
                    <PlayIcon size={15} />
                  </div>
                  <div onClick={() => linkHandler()}>
                    <p className="text-sm">재생</p>
                  </div>
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
        )}
      </div>
      <ReactPlayer
        onReady={() => setVideoReady(true)}
        url={makeYoutubeURL(videoKey)}
        width="100%"
        height="100%"
        playing={true}
        muted={isMuted}
        loop={true}
      />
    </div>
  );
}
