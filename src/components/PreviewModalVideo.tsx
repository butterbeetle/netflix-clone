export default function PreviewModalVideo() {
  return (
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
  );
}
