"use client";

import AntiClockWiseIcon from "@/components/ui/icons/AntiClockWiseIcon";
import ClockWiseIcon from "@/components/ui/icons/ClockWiseIcon";
import FullScreenIcon from "@/components/ui/icons/FullScreenIcon";
import PlayIcon from "@/components/ui/icons/PlayIcon";
import PlayerSkipForwardIcon from "@/components/ui/icons/PlayerSkipForwardIcon";
import SquareStackIcon from "@/components/ui/icons/SquareStackIcon";
import VolumeUpIcon from "@/components/ui/icons/VolumeUpIcon";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPage() {
  return (
    <div className="relative w-full h-full flex justify-center items-center flex-col bg-black">
      <div className="w-full aspect-square">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=dhBm2xgp5q4"}
          width="100%"
          height="100%"
          playing={false}
          muted={false}
        />
      </div>
      <div
        className="border-t-orange-600 border-t-2 absolute bottom-0 w-full text-white 
      py-5 px-3 flex text-3xl justify-between gap-2"
      >
        <div className="flex gap-3">
          <PlayIcon />
          <div className="relative w-fit ">
            <AntiClockWiseIcon />
            <div className="absolute w-full h-full top-0 left-0 text-[10px] flex justify-center items-center">
              10
            </div>
          </div>
          <div className="relative w-fit ">
            <ClockWiseIcon />
            <div className="absolute w-full h-full top-0 left-0 text-[10px] flex justify-center items-center">
              10
            </div>
          </div>
          <VolumeUpIcon />
        </div>
        <div className="text-base flex items-center">Title</div>
        <div className="flex gap-3">
          <PlayerSkipForwardIcon />
          <SquareStackIcon />
          <FullScreenIcon />
        </div>
      </div>
    </div>
  );
}
