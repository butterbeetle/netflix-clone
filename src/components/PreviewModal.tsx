import CloseIcon from "./ui/icons/CloseIcon";
import PreviewModalVideo from "./PreviewModalVideo";
import PreviewModalInfo from "./PreviewModalInfo";
import { ModalContent, ModalContentVideo } from "@/model/Content";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { FadeLoader } from "react-spinners";
import PreviewModalImage from "./PreviewModalImage";
import PreviewModalContent from "./PreviewModalContent";
import PreviewModalCast from "./PreviewModalCast";
import PreviewModalRelated from "./PreviewModalRelated";
import { useEffect } from "react";

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
  const { data: videoData, isLoading } = useSWR<ModalContentVideo[]>(
    `api/tmdb/movie/${id}/videos`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.width = document.body.clientWidth - 17 + "px";
  }, []);

  const videoKey = videoData?.[0]?.key;

  const closeHandler = () => {
    document.body.style.width = "unset";
    document.body.style.overflow = "unset";
    onClose();
  };

  return (
    <div
      className="absolute w-full h-full z-50 bg-neutral-900/50 flex justify-center  overflow-y-scroll"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeHandler();
        }
      }}
    >
      {isLoading && (
        <div className="flex justify-center top-1/3 relative">
          <FadeLoader color="white" />
        </div>
      )}
      {!isLoading && (
        <div className="absolute top-8 min-w-[456px] w-[90%] md:min-w-[750px] md:max-w-[890px]">
          <button
            onClick={() => closeHandler()}
            className="absolute z-10 right-0 m-4 cursor-pointer w-fit p-1 text-xl rounded-full bg-black text-white
          border-2 border-black
        active:border-white"
          >
            <CloseIcon />
          </button>
          {videoKey != undefined ? (
            <PreviewModalVideo videoKey={videoKey} />
          ) : (
            <PreviewModalImage imgPath={backdrop_path} />
          )}

          <div className="bg-[#181818] px-10 pt-2 pb-8">
            <PreviewModalInfo
              title={title}
              overview={overview}
              genre_ids={genre_ids}
            />
            <PreviewModalCast id={id} />
            {videoData && <PreviewModalRelated videoData={videoData} />}
            <PreviewModalContent id={id} type={"recommendations"} />
            <PreviewModalContent id={id} type={"similar"} />
          </div>
        </div>
      )}
    </div>
  );
}
