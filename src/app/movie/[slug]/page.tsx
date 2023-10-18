"use client";

import PlayPause from "@/components/ui/PlayPause";
import Volume from "@/components/ui/Volume";
import AntiClockWiseIcon from "@/components/ui/icons/AntiClockWiseIcon";
import ClockWiseIcon from "@/components/ui/icons/ClockWiseIcon";
import FullScreenIcon from "@/components/ui/icons/FullScreenIcon";
import PlayerSkipForwardIcon from "@/components/ui/icons/PlayerSkipForwardIcon";
import SquareStackIcon from "@/components/ui/icons/SquareStackIcon";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
// const ReactPlayer = dynamic(() => import("react-player"), {
//   ssr: false,
// });

export default function VideoPage() {
  const videoRef = useRef<ReactPlayer>(null);

  const [mount, setMount] = useState(false);
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 1,
  });

  useEffect(() => {
    setMount(true);
  }, []);

  const playPauseHandler = (play?: boolean) => {
    setState({ ...state, playing: play ?? !state.playing });
  };

  const onMuteHandler = () => {
    setState({ ...state, muted: !state.muted });
  };

  const onRewindHandler = (rewind: boolean) => {
    if (rewind)
      videoRef?.current?.seekTo(videoRef.current.getCurrentTime() - 10);
    else videoRef?.current?.seekTo(videoRef.current.getCurrentTime() + 10);
  };
  console.log(`Muted:${state.muted} Volume:${state.volume}`);
  return (
    <div className="relative w-full h-full flex justify-center items-center flex-col bg-black">
      <div className="relative w-full aspect-square select-none">
        {mount && (
          <ReactPlayer
            ref={videoRef}
            url={"https://www.youtube.com/watch?v=sF61IuL9C0A"}
            width="100%"
            height="100%"
            playing={state.playing}
            controls={false}
            muted={state.muted}
            volume={state.volume}
            onPlay={() => playPauseHandler(true)}
            onPause={() => playPauseHandler(false)}
          />
        )}
      </div>
      <div
        className="border-t-orange-600 border-t-2 absolute bottom-0 w-full text-white 
      py-5 px-3 flex text-3xl justify-between gap-2 z-[3]"
      >
        <div className="flex gap-3">
          <div
            onClick={() => playPauseHandler()}
            className="cursor-pointer hover:scale-[1.2] transition-all"
          >
            <PlayPause isPlaying={state.playing} />
          </div>
          <div
            onClick={() => onRewindHandler(true)}
            className="relative w-fit cursor-pointer hover:scale-[1.2] transition-all"
          >
            <AntiClockWiseIcon />
            <div className="absolute w-full h-full top-0 left-0 text-[10px] flex justify-center items-center">
              10
            </div>
          </div>
          <div
            onClick={() => onRewindHandler(false)}
            className="relative w-fit cursor-pointer hover:scale-[1.2] transition-all"
          >
            <ClockWiseIcon />
            <div className="absolute w-full h-full top-0 left-0 text-[10px] flex justify-center items-center">
              10
            </div>
          </div>
          <div className="relative group cursor-pointer  transition-all">
            <div
              onClick={() => onMuteHandler()}
              className="group-hover:scale-[1.2]"
            >
              <Volume isMuted={state.muted} />
            </div>
            <div className=" bg-[#191919] p-1 scale-[0.8] flex justify-center absolute -top-[70px] -left-14 opacity-0 group-hover:opacity-100 -rotate-90">
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={state.muted ? 0 : state.volume}
                onChange={(e) =>
                  setState({
                    ...state,
                    muted: state.volume === 0.1 ? true : false,
                    volume: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="text-base flex items-center">Title</div>
        <div className="flex gap-3">
          <div className="cursor-pointer hover:scale-[1.2] transition-all">
            <PlayerSkipForwardIcon />
          </div>
          <div className="cursor-pointer hover:scale-[1.2] transition-all">
            <SquareStackIcon />
          </div>
          <div className="cursor-pointer hover:scale-[1.2] transition-all">
            <FullScreenIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
