import CloseIcon from "./ui/icons/CloseIcon";
import PreviewModalVisual from "./PreviewModalVisual";
import PreviewModalInfo from "./PreviewModalInfo";

export default function PreviewModal() {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-50 bg-neutral-900/50 flex justify-center">
      <div className="absolute top-8 min-w-[456px] w-[90%] md:min-w-[750px] md:max-w-[890px] ">
        <div className="absolute z-10 right-0 m-4 cursor-pointer w-fit p-2 text-xl rounded-full bg-black text-white">
          <CloseIcon />
        </div>
        <PreviewModalVisual url={"aaa"} />
        <PreviewModalInfo />
      </div>
    </div>
  );
}
