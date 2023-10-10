import Image from "next/image";

type PreviewModalContentTitle = "similar" | "recommendation";

type Props = {
  title: PreviewModalContentTitle;
};

export default function PreviewModalContent({ title }: Props) {
  return (
    <div className="mb-12">
      <div className="text-white">
        <div className="text-2xl mb-5">
          {title === "similar" ? "비슷한 콘텐츠" : "추천 콘텐츠"}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
            <Image
              className="aspect-[15/7] object-cover w-full rounded-t-md"
              src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
              width={100}
              height={100}
              alt="placeholder"
            />
            <div className="flex justify-between p-4">
              <div className="text-base">2021</div>
              <div>Icon</div>
            </div>
            <div className="text-sm px-4">
              지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게 반목하는
              두 쌍둥이 도시에서, 두 자매가 서로 반대편에 서서 싸우기에 이른다.
              마법 기술과 신념의 충돌 속에서 전쟁이 시작된다.
            </div>
          </div>
          <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
            <Image
              className="aspect-[15/7] object-cover w-full rounded-t-md"
              src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
              width={100}
              height={100}
              alt="placeholder"
            />
            <div className="flex justify-between p-4">
              <div className="text-base">2021</div>
              <div>Icon</div>
            </div>
            <div className="text-sm px-4">
              지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게 반목하는
              두 쌍둥이 도시에서, 두 자매가 서로 반대편에 서서 싸우기에 이른다.
              마법 기술과 신념의 충돌 속에서 전쟁이 시작된다.
            </div>
          </div>
          <div className="bg-[#2f2f2f] min-h-[22em] rounded-md">
            <Image
              className="aspect-[15/7] object-cover w-full rounded-t-md"
              src={`http://via.placeholder.com/300/FAB000/white.png?text=Recommand`}
              width={100}
              height={100}
              alt="placeholder"
            />
            <div className="flex justify-between p-4">
              <div className="text-base">2021</div>
              <div>Icon</div>
            </div>
            <div className="text-sm px-4">
              지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게 반목하는
              두 쌍둥이 도시에서, 두 자매가 서로 반대편에 서서 싸우기에 이른다.
              마법 기술과 신념의 충돌 속에서 전쟁이 시작된다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
