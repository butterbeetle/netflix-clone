import PreviewModalContent from "./PreviewModalContent";
export default function PreviewModalInfo() {
  return (
    <div className="bg-[#181818] px-10 pt-2 pb-8">
      <div className="flex gap-8 mb-12">
        <div className="w-2/3 text-white text-sm">
          <p className="text-xl mb-2">Title</p>
          1956년, 프랑스의 한 성당에서 신부가 끔찍하게 살해당한다. 이 사건을
          조사하기 위해 파견된 아이린 수녀는 4년 전 자신을 공포에 떨게 했던
          악마의 기운을 느낀다. 어두운 밤, 계속해서 일어나는 의문의 사건들
          가운데 충격적인 진실이 드러나는데…
        </div>
        <div className="w-1/3 text-sm">
          <div className="mb-3 cursor-pointer">
            <p className="text-[#777777] inline mr-1 cursor-default">출연:</p>
            <p className="text-white inline hover:underline">나,</p>
            <p className="text-white inline hover:underline">너,</p>
            <p className="italic text-white inline hover:underline">더 보기</p>
          </div>
          <div className="cursor-pointer">
            <p className="text-[#777777] inline mr-1 cursor-default">장르:</p>
            <p className="text-white inline hover:underline">액션,</p>
            <p className="text-white inline hover:underline">판타지,</p>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <div className="text-white mb-1">
          <div className="text-2xl mb-5">관련 영상</div>
        </div>
        <div className="text-[#4d4d4d]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className="min-h-[10rem] p-4 relative cursor-pointer rounded
        flex items-center
        border border-x-0
        border-t-[#404040]
        border-b-[#404040]"
            >
              {num}회
            </div>
          ))}
        </div>
      </div>
      <PreviewModalContent title={"recommendation"} />
      <PreviewModalContent title={"similar"} />
    </div>
  );
}
