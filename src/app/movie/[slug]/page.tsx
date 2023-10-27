"use client";

import PlayPause from "@/components/ui/PlayPause";
import Volume from "@/components/ui/Volume";
import AntiClockWiseIcon from "@/components/ui/icons/AntiClockWiseIcon";
import ClockWiseIcon from "@/components/ui/icons/ClockWiseIcon";
import FullScreenIcon from "@/components/ui/icons/FullScreenIcon";
import FullScreenExitIcon from "@/components/ui/icons/FullScreenExitIcon";
import PlayerSkipForwardIcon from "@/components/ui/icons/PlayerSkipForwardIcon";
import SquareStackIcon from "@/components/ui/icons/SquareStackIcon";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
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
    fullScreen: false,
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
    if (rewind) {
      videoRef?.current?.seekTo(videoRef.current.getCurrentTime() - 10);
    } else videoRef?.current?.seekTo(videoRef.current.getCurrentTime() + 10);
  };

  const handle = useFullScreenHandle();

  const fullScreenHandler = () => {
    setState({ ...state, fullScreen: !state.fullScreen });
  };

  const [playedState, setPlayedState] = useState({
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  });

  return (
    <FullScreen
      className="relative w-full h-full"
      handle={handle}
      onChange={() => fullScreenHandler()}
    >
      <div className="w-full h-full flex justify-center items-center flex-col bg-black">
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
              loop={false}
              onProgress={(progress) => {
                setPlayedState({
                  played: progress.played,
                  playedSeconds: progress.playedSeconds,
                  loaded: progress.loaded,
                  loadedSeconds: progress.loadedSeconds,
                });
              }}
              on
              onEnded={() => playPauseHandler(false)}
              onPlay={() => playPauseHandler(true)}
              onPause={() => playPauseHandler(false)}
            />
          )}
        </div>
        <div
          className="absolute bottom-0 w-full text-white 
      pb-2 px-2 flex flex-col text-3xl z-[3] gap-2"
        >
          <div className="w-full flex gap-2">
            <input className="w-full " type="range" />
            <p className="text-[10px]">{playedState.played}</p>
          </div>
          <div className="flex gap-2 justify-between">
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
                <div className="hidden group-hover:block">
                  <div
                    className="  bg-[#191919] p-1 scale-[0.8] flex justify-center absolute -top-[70px] -left-14
               opacity-0 group-hover:opacity-100 -rotate-90"
                  >
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
            </div>
            <div className="text-base flex items-center">Title</div>
            <div className="flex gap-3">
              <div className="cursor-pointer hover:scale-[1.2] transition-all">
                <PlayerSkipForwardIcon />
              </div>
              <div className="cursor-pointer hover:scale-[1.2] transition-all">
                <SquareStackIcon />
              </div>
              <div
                onClick={state.fullScreen ? handle.enter : handle.exit}
                className="cursor-pointer hover:scale-[1.2] transition-all"
              >
                {state.fullScreen ? <FullScreenIcon /> : <FullScreenExitIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
}
