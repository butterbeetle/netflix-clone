"use client";

import PlayPause from "@/components/ui/PlayPause";
import Volume from "@/components/ui/Volume";
import AntiClockWiseIcon from "@/components/ui/icons/AntiClockWiseIcon";
import ClockWiseIcon from "@/components/ui/icons/ClockWiseIcon";
import FullScreenIcon from "@/components/ui/icons/FullScreenIcon";
import FullScreenExitIcon from "@/components/ui/icons/FullScreenExitIcon";
import PlayerSkipForwardIcon from "@/components/ui/icons/PlayerSkipForwardIcon";
import PlayIcon from "@/components/ui/icons/PlayIcon";
import SquareStackIcon from "@/components/ui/icons/SquareStackIcon";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { formatTime } from "@/util/converter";
import GoBackIcon from "@/components/ui/icons/GoBackIcon";
import { makeYoutubeThumbnailIURL, makeYoutubeURL } from "@/service/tmdb";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import useSWR from "swr";
import { ModalContentVideo } from "@/model/Content";
import fetcher from "@/lib/fetcher";
import Image from "next/image";

export default function WatchPage() {
  const videoRef = useRef<ReactPlayer>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("id");
  const key = params.get("key") as string;
  const mainTitle = params.get("title") as string;

  const { data: videoData, isLoading } = useSWR<ModalContentVideo[]>(
    `/api/tmdb/movie/${id}/videos`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const videoTitle = videoData?.map((data) => {
    if (data.key === key) return data.name;
  });

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

  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const [curVideoKey, setCurVideoKey] = useState(key);

  const { playing, muted, volume, played, seeking, fullScreen } = videoState;

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

  // console.log(videoData);
  // console.log(Math.ceil(Number(played.toFixed(2)) * 10));

  const videoKeyHandler = (key: string) => {
    key !== curVideoKey && setCurVideoKey(key);
    key === curVideoKey &&
      router.replace(`/watch?id=${id}&key=${key}&title=${mainTitle}`);
  };
  return (
    <FullScreen
      className="relative w-screen h-screen "
      handle={fullScreenhandle}
      onChange={() => fullScreenHandler()}
    >
      {!videoReady && isLoading && (
        <div className="absolute w-full h-full text-white z-50 flex flex-col gap-3 items-center justify-center bg-black/90">
          {!videoError && (
            <>
              <Spinner color={"white"} size={100} />
              <span>유튜브 영상을 가져오고 있습니다...!</span>
            </>
          )}
          {videoError && <span>유튜브 영상이 존재하지 않습니다...!</span>}
        </div>
      )}
      <div className="w-full h-full flex justify-center items-center flex-col bg-black">
        <div className="absolute top-0 w-full text-white z-[3] px-2 pt-2 text-3xl ">
          <button onClick={() => router.back()} className="w-fit ">
            <GoBackIcon />
          </button>
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
              // url={`https://www.youtube.com/watch?v=sN9vafGli18`}
              width="100%"
              height="100%"
              controls={false}
              playing={playing}
              muted={muted}
              volume={volume}
              loop={false}
              onError={() => setVideoError(true)}
              onReady={() => setVideoReady(true)}
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
              value={Math.ceil(Number(played.toFixed(2)) * 10) * 10}
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
            <div className="text-sm md:text-base lg:text-xl flex items-center max-w-[200px] md:max-w-[500px] ">
              <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                {videoTitle}
              </p>
            </div>
            <div className="relative flex items-center gap-3">
              {/* <div className="cursor-pointer hover:scale-[1.2] transition-all">
                <PlayerSkipForwardIcon />
              </div> */}
              <div className="cursor-pointer  transition-all group">
                <div className="group-hover:scale-[1.2]">
                  <SquareStackIcon />
                </div>
                <div
                  className="absolute bg-[#262626] border  border-red-900 z-[3]
          min-w-[400px] md:min-w-[600px] lg:min-w-[700px]
          min-h-[360px] md:min-h-[450px] lg:min-h-[600px] xl:min-h-[680px]
          -right-2 bottom-10 
          hidden
          opacity-0
          group-hover:block
          group-hover:opacity-100"
                >
                  <div className="p-2 text-base md:text-lg lg:text-2xl xl:text-3xl">
                    {mainTitle}
                  </div>
                  <ul
                    className="text-[11px] md:text-[13px] lg:text-[21px] 
          max-h-[320px] md:max-h-[410px] lg:max-h-[560px] xl:max-h-[640px]
                overflow-y-auto"
                  >
                    {videoData?.map(({ key, name }, num) => (
                      <li
                        key={key}
                        onClick={() => videoKeyHandler(key)}
                        className={`p-4 md:p-6 lg:p-8 group
                      ${key === curVideoKey ? "bg-black/50" : ""}
                      ${
                        key !== curVideoKey &&
                        "hover:bg-white/10 cursor-pointer "
                      }
                      `}
                      >
                        <div className="flex gap-3 leading-3">
                          <p>{num + 1}</p>
                          <p>{name}</p>
                        </div>
                        {key === curVideoKey && (
                          <div className="relative flex justify-center mt-3 md:mt-4 lg:mt-5 ">
                            <div
                              className="absolute aspect-video w-[25vw]
                          flex justify-center items-center opacity-50
                          group-hover:opacity-100 transition
                          group-hover:scale-105"
                            >
                              <div className="rounded-full bg-black/50 text-[8vw] cursor-pointer">
                                <PlayIcon />
                              </div>
                            </div>
                            <Image
                              className="aspect-video w-[25vw]"
                              src={
                                makeYoutubeThumbnailIURL(key) ??
                                `http://via.placeholder.com/300/FFF000/?text=Thumbnail`
                              }
                              placeholder="blur"
                              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
                              alt=""
                              width={130}
                              height={130}
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
