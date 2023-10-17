"use client";

import PlayPause from "@/components/ui/PlayPause";
import AntiClockWiseIcon from "@/components/ui/icons/AntiClockWiseIcon";
import ClockWiseIcon from "@/components/ui/icons/ClockWiseIcon";
import FullScreenIcon from "@/components/ui/icons/FullScreenIcon";
import PlayIcon from "@/components/ui/icons/PlayIcon";
import PlayerSkipForwardIcon from "@/components/ui/icons/PlayerSkipForwardIcon";
import SquareStackIcon from "@/components/ui/icons/SquareStackIcon";
import VolumeUpIcon from "@/components/ui/icons/VolumeUpIcon";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPage() {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 1.0,
  });

  const onPlayingHanlder = () => {
    setState({ ...state, playing: !state.playing });
  };
  return (
    <div className="relative w-full h-full flex justify-center items-center flex-col bg-black">
      <div className="w-full aspect-square">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=sF61IuL9C0A"}
          width="100%"
          height="100%"
          playing={state.playing}
          controls={false}
          muted={false}
        />
      </div>
      <div
        className="border-t-orange-600 border-t-2 absolute bottom-0 w-full text-white 
      py-5 px-3 flex text-3xl justify-between gap-2"
      >
        <div className="flex gap-3">
          <div
            onClick={onPlayingHanlder}
            className="cursor-pointer hover:scale-[1.3] transition-all"
          >
            <PlayPause isPlaying={state.playing} />
          </div>
          <div className="relative w-fit cursor-pointer hover:scale-[1.3] transition-all">
            <AntiClockWiseIcon />
            <div className="absolute w-full h-full top-0 left-0 text-[10px] flex justify-center items-center">
              10
            </div>
          </div>
          <div className="relative w-fit cursor-pointer hover:scale-[1.3] transition-all">
            <ClockWiseIcon />
            <div className="absolute w-full h-full top-0 left-0 text-[10px] flex justify-center items-center">
              10
            </div>
          </div>
          <div className="cursor-pointer hover:scale-[1.3] transition-all">
            <VolumeUpIcon />
          </div>
        </div>
        <div className="text-base flex items-center">Title</div>
        <div className="flex gap-3">
          <div className="cursor-pointer hover:scale-[1.3] transition-all">
            <PlayerSkipForwardIcon />
          </div>
          <div className="cursor-pointer hover:scale-[1.3] transition-all">
            <SquareStackIcon />
          </div>
          <div className="cursor-pointer hover:scale-[1.3] transition-all">
            <FullScreenIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
