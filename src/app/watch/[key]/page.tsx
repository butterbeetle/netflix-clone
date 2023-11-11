"use client";

import PlayPause from "@/components/ui/PlayPause";
import Volume from "@/components/ui/Volume";
import AntiClockWiseIcon from "@/components/ui/icons/AntiClockWiseIcon";
import ClockWiseIcon from "@/components/ui/icons/ClockWiseIcon";
import FullScreenIcon from "@/components/ui/icons/FullScreenIcon";
import FullScreenExitIcon from "@/components/ui/icons/FullScreenExitIcon";
import PlayerSkipForwardIcon from "@/components/ui/icons/PlayerSkipForwardIcon";
import SquareStackIcon from "@/components/ui/icons/SquareStackIcon";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { formatTime } from "@/util/converter";
import GoBackIcon from "@/components/ui/icons/GoBackIcon";
import { makeYoutubeURL } from "@/service/tmdb";
import { useParams } from "next/navigation";
// const ReactPlayer = dynamic(() => import("react-player"), {
//   ssr: false,
// });

export default function VideoPage() {
  const videoRef = useRef<ReactPlayer>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const { key } = useParams() as { key: string };

  const [mount, setMount] = useState(false);
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: true,
    fullScreen: false,
  });

  const { playing, muted, volume, played, seeking, buffer, fullScreen } =
    videoState;

  const currentTime = videoRef.current
    ? videoRef.current.getCurrentTime()
    : "00:00";
  const duration = videoRef.current ? videoRef.current.getDuration() : "00:00";

  useEffect(() => {
    setMount(true);
  }, []);

  const playPauseHandler = (play?: boolean) => {
    setVideoState({ ...videoState, playing: play ?? !videoState.playing });
  };

  const onMuteHandler = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onRewindHandler = (rewind: boolean) => {
    if (rewind) {
      videoRef?.current?.seekTo(videoRef.current.getCurrentTime() - 10);
    } else videoRef?.current?.seekTo(videoRef.current.getCurrentTime() + 10);
  };

  const fullScreenhandle = useFullScreenHandle();

  const fullScreenHandler = () => {
    setVideoState({ ...videoState, fullScreen: !videoState.fullScreen });
  };

  const progressHandler = (played: number) => {
    if (!seeking) {
      setVideoState({ ...videoState, played });
    }
  };

  /**
   * Progress bar 움직일 때
   */
  const onSeekHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoState({ ...videoState, played: parseFloat(e.target.value) / 100 });
  };

  /**
   * 마우스 버튼 떼었을 때
   */
  const onSeekMouseUpHandler = () => {
    setVideoState({ ...videoState, seeking: false });
    videoRef?.current?.seekTo(Number(progressRef?.current?.value) / 100);
  };

  /**
   * 마우스 버튼 클릭했을 때
   */
  const onSeekMouseDownHandler = () => {
    setVideoState({ ...videoState, seeking: true });
  };

  return (
    <FullScreen
      className="relative w-screen h-screen "
      handle={fullScreenhandle}
      onChange={() => fullScreenHandler()}
    >
      <div className="w-full h-full flex justify-center items-center flex-col bg-black">
        <div className="absolute top-0 w-full text-white z-[3] px-2 pt-2 text-3xl ">
          <div className="w-fit cursor-pointer">
            <GoBackIcon />
          </div>
        </div>
        <div
          onClick={() => playPauseHandler()}
          className="absolute w-full h-full z-[2]"
        />
        <div className="relative w-full aspect-square select-none">
          {mount && (
            <ReactPlayer
              ref={videoRef}
              url={makeYoutubeURL(key)}
              width="100%"
              height="100%"
              controls={false}
              playing={playing}
              muted={muted}
              volume={volume}
              loop={false}
              onEnded={() => playPauseHandler(false)}
              onPlay={() => playPauseHandler(true)}
              onPause={() => playPauseHandler(false)}
              onProgress={(progress) => progressHandler(progress.played)}
            />
          )}
        </div>
        <div
          className="absolute bottom-0 w-full text-white 
      pb-2 px-2 flex flex-col text-3xl z-[3] gap-2"
        >
          <div className="w-full flex gap-2">
            <input
              ref={progressRef}
              className="w-full"
              type="range"
              min={0}
              max={100}
              value={played * 100}
              onChange={onSeekHandler}
              onClick={onSeekMouseUpHandler}
              onMouseDown={onSeekMouseDownHandler}
            />
            <div className="w-[10%]">
              <p className="w-full text-[10px] md:text-sm lg:text-base text-center">
                {formatTime(Number(duration) - Number(currentTime))}
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-between ">
            <div className="flex gap-3">
              <div
                onClick={() => playPauseHandler()}
                className="cursor-pointer hover:scale-[1.2] transition-all md:text-[40px]"
              >
                <PlayPause isPlaying={playing} />
              </div>
              <div
                onClick={() => onRewindHandler(true)}
                className="relative w-fit cursor-pointer hover:scale-[1.2] transition-all"
              >
                <div className="md:text-[40px]">
                  <AntiClockWiseIcon />
                </div>
                <div className="absolute w-full h-full top-0 left-0 text-[10px] md:text-sm flex justify-center items-center">
                  10
                </div>
              </div>
              <div
                onClick={() => onRewindHandler(false)}
                className="relative w-fit cursor-pointer hover:scale-[1.2] transition-all"
              >
                <div className="md:text-[40px]">
                  <ClockWiseIcon />
                </div>
                <div className="absolute w-full h-full top-0 left-0 text-[10px] md:text-sm flex justify-center items-center">
                  10
                </div>
              </div>
              <div className="relative group cursor-pointer  transition-all">
                <div
                  onClick={() => onMuteHandler()}
                  className="group-hover:scale-[1.2] md:text-[40px]"
                >
                  <Volume isMuted={muted} />
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
                      value={muted ? 0 : volume}
                      onChange={(e) =>
                        setVideoState({
                          ...videoState,
                          muted: volume === 0.1 ? true : false,
                          volume: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-base md:text-xl flex items-center">Title</div>
            <div className="flex gap-3">
              {/* <div className="cursor-pointer hover:scale-[1.2] transition-all">
                <PlayerSkipForwardIcon />
              </div>
              <div className="cursor-pointer hover:scale-[1.2] transition-all">
                <SquareStackIcon />
              </div> */}
              <div
                onClick={
                  fullScreen ? fullScreenhandle.enter : fullScreenhandle.exit
                }
                className="cursor-pointer hover:scale-[1.2] transition-all md:text-[40px]"
              >
                {fullScreen ? <FullScreenIcon /> : <FullScreenExitIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
}
