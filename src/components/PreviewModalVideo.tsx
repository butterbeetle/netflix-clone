import { makeYoutubeLink } from "@/service/tmdb";
import ReactPlayer from "react-player";

type Props = {
  videoKey: string;
};

export default function PreviewModalVideo({ videoKey }: Props) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-t-md">
      <div
        className="absolute bottom-0 w-full h-1/2 
      bg-gradient-to-t from-[#181818] to-[#181818]/10"
      ></div>
      <ReactPlayer
        url={makeYoutubeLink(videoKey)}
        width="100%"
        height="100%"
        playing={true}
        muted={true}
        loop={true}
      />
    </div>
  );
}
