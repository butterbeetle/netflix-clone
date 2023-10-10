import Image from "next/image";

type Props = {
  id: number;
};

export default function PreviewModalCast({ id }: Props) {
  return (
    <div className="mb-12">
      <div className="text-white mb-1">
        <div className="text-2xl mb-5">출연진</div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <div className="flex flex-col items-center group cursor-pointer">
          <Image
            className="mb-2 aspect-[1/1] w-full"
            src={`http://via.placeholder.com/300/FFFFFF/?text=human`}
            width={150}
            height={150}
            alt="abc"
          />
          <div className="text-[12px] text-center line-clamp-2">
            <div className="text-bold text-white group-hover:underline">
              Tadashi Miura
            </div>
            <div className="text-[#4d4d4d]">Kenji Iwashimizu</div>
          </div>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Image
            className="mb-2 aspect-[1/1] w-full"
            src={`http://via.placeholder.com/300/FFFFFF/?text=human`}
            width={150}
            height={150}
            alt="abc"
          />
          <div className="text-[12px] text-center line-clamp-2">
            <div className="text-bold text-white group-hover:underline">
              Masato Hosokawa
            </div>
            <div className="text-[#4d4d4d]">{"Judo club's member B"}</div>
          </div>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Image
            className="mb-2 aspect-[1/1] w-full"
            src={`http://via.placeholder.com/300/FFFFFF/?text=human`}
            width={150}
            height={150}
            alt="abc"
          />
          <div className="text-[12px] text-center line-clamp-2">
            <div className="text-bold text-white group-hover:underline">
              Tsutomu Itô
            </div>
            <div className="text-[#4d4d4d]">Hansuke Yamashita</div>
          </div>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Image
            className="mb-2 aspect-[1/1] w-full"
            src={`http://via.placeholder.com/300/FFFFFF/?text=human`}
            width={150}
            height={150}
            alt="abc"
          />
          <div className="text-[12px] text-center line-clamp-2">
            <div className="text-bold text-white group-hover:underline">
              Tsutomu Itô
            </div>
            <div className="text-[#4d4d4d]">Hansuke Yamashita</div>
          </div>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Image
            className="mb-2 aspect-[1/1] w-full"
            src={`http://via.placeholder.com/300/FFFFFF/?text=human`}
            width={150}
            height={150}
            alt="abc"
          />
          <div className="text-[12px] text-center line-clamp-2">
            <div className="text-bold text-white group-hover:underline">
              Tsutomu Itô
            </div>
            <div className="text-[#4d4d4d]">Hansuke Yamashita</div>
          </div>
        </div>
      </div>
    </div>
  );
}
