import PreviewModalContent from "./PreviewModalContent";
import PreviewModalCast from "./PreviewModalCast";
import PreviewModalVideo from "./PreviewModalVideo";
import { ModalContent } from "@/model/Content";

export default function PreviewModalInfo({
  id,
  title,
  overview,
  genre_ids,
}: ModalContent) {
  return (
    <div className="bg-[#181818] px-10 pt-2 pb-8">
      <div className="flex gap-8 mb-12">
        <div className="text-white text-sm flex flex-col gap-2">
          <p className="text-xl">Title</p>
          <div className="cursor-pointer">
            <p className="text-[#777777] inline mr-1 cursor-default">장르:</p>
            <p className="text-white inline hover:underline">액션,</p>
            <p className="text-white inline hover:underline">판타지,</p>
          </div>
          <span>
            1956년, 프랑스의 한 성당에서 신부가 끔찍하게 살해당한다. 이 사건을
            조사하기 위해 파견된 아이린 수녀는 4년 전 자신을 공포에 떨게 했던
            악마의 기운을 느낀다. 어두운 밤, 계속해서 일어나는 의문의 사건들
            가운데 충격적인 진실이 드러나는데…
          </span>
        </div>
      </div>
      <PreviewModalCast id={id} />
      <PreviewModalVideo />
      <PreviewModalContent type={"recommendations"} />
      <PreviewModalContent type={"similar"} />
    </div>
  );
}
