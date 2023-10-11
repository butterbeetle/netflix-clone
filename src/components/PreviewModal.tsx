import CloseIcon from "./ui/icons/CloseIcon";
import PreviewModalVideo from "./PreviewModalVideo";
import PreviewModalInfo from "./PreviewModalInfo";
import { ModalContent } from "@/model/Content";

type Props = ModalContent & {
  onClose: () => void;
};

export default function PreviewModal({
  onClose,
  id,
  genre_ids,
  overview,
  title,
}: Props) {
  return (
    <div
      className="absolute w-full h-full top-0 left-0 z-50 bg-neutral-900/50 flex justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute top-8 min-w-[456px] w-[90%] md:min-w-[750px] md:max-w-[890px] ">
        <button
          onClick={() => onClose()}
          className="absolute z-10 right-0 m-4 cursor-pointer w-fit p-1 text-xl rounded-full bg-black text-white
          border-2 border-black
        active:border-white"
        >
          <CloseIcon />
        </button>
        <PreviewModalVideo key={"aaa"} />
        <PreviewModalInfo
          id={id}
          genre_ids={genre_ids}
          overview={overview}
          title={title}
        />
      </div>
    </div>
  );
}
