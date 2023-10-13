import CloseIcon from "./ui/icons/CloseIcon";
import PreviewModalVideo from "./PreviewModalVideo";
import PreviewModalInfo from "./PreviewModalInfo";
import { ModalContent } from "@/model/Content";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Image from "next/image";
import { tmdbImageURL } from "@/service/tmdb";
import { FadeLoader, PulseLoader } from "react-spinners";

type Props = ModalContent & {
  onClose: () => void;
};

export default function PreviewModal({
  onClose,
  id,
  genre_ids,
  overview,
  title,
  backdrop_path,
}: Props) {
  const { data: videoData, isLoading } = useSWR(
    `api/tmdb/movie/${id}/videos`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const videoKey = videoData?.[0]?.key;

  return (
    <div
      className="absolute w-full h-full top-0 left-0 z-50 bg-neutral-900/50 flex justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {isLoading && (
        <div className="flex justify-center top-1/3 relative">
          <FadeLoader color="white" />
        </div>
      )}
      {!isLoading && (
        <div className="absolute top-8 min-w-[456px] w-[90%] md:min-w-[750px] md:max-w-[890px] ">
          <button
            onClick={() => onClose()}
            className="absolute z-10 right-0 m-4 cursor-pointer w-fit p-1 text-xl rounded-full bg-black text-white
          border-2 border-black
        active:border-white"
          >
            <CloseIcon />
          </button>
          {videoKey !== undefined ? (
            <PreviewModalVideo videoKey={videoKey} />
          ) : (
            <div className="relative w-full aspect-video">
              <div
                className="absolute w-full h-full
      bg-gradient-to-t from-[#181818] to-[#181818]/10 to-50%
      flex items-center px-16 "
              />
              <Image
                className="w-full aspect-video rounded-t-md"
                src={`${tmdbImageURL}/w300/${backdrop_path}`}
                width={100}
                height={100}
                alt="placeholder"
              />
            </div>
          )}
          <PreviewModalInfo
            id={id}
            genre_ids={genre_ids}
            overview={overview}
            title={title}
            backdrop_path={backdrop_path}
            videoData={videoData}
          />
        </div>
      )}
    </div>
  );
}
