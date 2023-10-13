import { makeYoutubeThumbnailIURL } from "@/service/tmdb";
import { engVideoTypeToKR } from "@/util/converter";
import { publishedFormat } from "@/util/date";
import Image from "next/image";
import PlayIcon from "./ui/icons/PlayIcon";

type Props = {
  videoData: any;
};
export default function PreviewModalRelated({ videoData }: Props) {
  console.log(videoData);
  return (
    <div className="mb-12">
      <div className="text-white mb-1">
        <div className="text-2xl mb-5">관련 영상</div>
      </div>
      <div className="text-[#4d4d4d] min-h-[10rem]">
        {videoData?.length > 0 ? (
          videoData.map((video: any) => (
            <div
              key={video.id}
              className="min-h-[10rem] relative cursor-pointer rounded
      flex items-center gap-4 p-4 box-border group
      border border-x-0
      border-t-[#404040]
      border-b-[#404040]"
            >
              <div
                className="opacity-0 min-h-full
            group-hover:opacity-100
            absolute w-full h-full bg-black/10 transition top-0 left-0"
              />
              <div className="relative aspect-square min-w-[128px]">
                <Image
                  className="object-contain w-full aspect-square"
                  src={
                    makeYoutubeThumbnailIURL(video.key) ??
                    `http://via.placeholder.com/300/FFF000/?text=Thumbnail`
                  }
                  width={100}
                  height={100}
                  alt="thumbnail"
                />
                <div
                  className="opacity-0 duration-500 transition-all
            group-hover:opacity-100 absolute w-full h-full top-0 left-0 flex items-center justify-center"
                >
                  <div className="text-white rounded-full border-2 border-white ">
                    <PlayIcon size={35} />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#d2d2d2]">
                  {engVideoTypeToKR(video.type)}
                </p>
                <p className="text-base text-white line-clamp-2">
                  {video.name}
                </p>
                <p className="text-sm text-[#46d369]">
                  {publishedFormat(video.published_at)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="min-h-[10rem] relative rounded
      flex items-center gap-4 p-4 box-border group
      border border-x-0 justify-center
      border-t-[#404040]
      border-b-[#404040]"
          >
            관련 영상이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
