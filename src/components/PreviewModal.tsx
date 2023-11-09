import CloseIcon from "./ui/icons/CloseIcon";
import PreviewModalVideo from "./PreviewModalVideo";
import PreviewModalInfo from "./PreviewModalInfo";
import {
  ActorContent,
  Content,
  DetailContent,
  ModalContentVideo,
} from "@/model/Content";
import PreviewModalImage from "./PreviewModalImage";
import PreviewModalContent from "./PreviewModalContent";
import PreviewModalCast from "./PreviewModalCast";
import PreviewModalRelated from "./PreviewModalRelated";

type Props = {
  onClose: () => void;
  videoData: ModalContentVideo[];
  detailData: DetailContent;
  actorData: ActorContent[];
  recommendationsData: Content[];
  similarData: Content[];
};

export default function PreviewModal({
  onClose,
  videoData,
  detailData,
  actorData,
  recommendationsData,
  similarData,
}: Props) {
  const videoKey = videoData?.[0]?.key;
  return (
    <div className="relative w-full h-screen overflow-x-hidden overflow-y-scroll">
      <div className="absolute min-w-[456px] w-[90%] md:min-w-[750px] md:max-w-[890px] ">
        <button
          onClick={() => onClose()}
          className="absolute z-10 right-0 m-4 cursor-pointer w-fit p-1 text-xl rounded-full bg-black text-white
          border-2 border-black
        active:border-white"
        >
          <CloseIcon />
        </button>
        {videoKey != undefined ? (
          <PreviewModalVideo videoData={videoData} videoKey={videoKey} />
        ) : (
          <PreviewModalImage imgPath={detailData.backdrop_path} />
        )}

        <div className="bg-[#181818] px-10 pt-2 pb-8">
          <PreviewModalInfo
            title={detailData.title}
            overview={detailData.overview}
            genre_ids={detailData.genres.map((item) => item.id)}
          />
          <PreviewModalCast actorData={actorData} />
          <PreviewModalRelated videoData={videoData} />
          <PreviewModalContent
            type={"recommendations"}
            data={recommendationsData}
          />
          <PreviewModalContent type={"similar"} data={similarData} />
        </div>
      </div>
    </div>
  );
}
