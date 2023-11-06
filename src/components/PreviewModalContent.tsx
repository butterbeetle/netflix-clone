import fetcher from "@/lib/fetcher";
import { Content } from "@/model/Content";
import Image from "next/image";
import useSWR from "swr";
import PlusIcon from "./ui/icons/PlusIcon";
import { tmdbImageURL } from "@/service/tmdb";

type PreviewModalContentType = "similar" | "recommendations";

type Props = {
  type: string;
  data: Content[];
};

export default function PreviewModalContent({ type, data }: Props) {
  return (
    <div className="mb-12">
      <div className="text-white">
        <div className="text-2xl mb-5">
          {type === "similar" ? "비슷한 콘텐츠" : "추천 콘텐츠"}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data?.slice(0, 2).map((dd) => (
            <div
              key={dd.id}
              className="bg-[#2f2f2f] min-h-[22em] rounded-md hover:cursor-pointer"
            >
              <Image
                className="aspect-video object-cover w-full rounded-t-md"
                src={`${tmdbImageURL}/w300/${dd.backdrop_path}`}
                width={150}
                height={150}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
                alt="backdrop"
              />
              <div className="flex justify-between items-center p-4 min-h-[92px]">
                <div className="text-[12px]">
                  <div>{dd.title}</div>
                  <div className="text-[#46d369]">{dd.release_date}</div>
                </div>
                <div
                  className="min-w-[32px] aspect-square bg-black/10 rounded-full 
                  flex justify-center items-center 
                border-gray-500 border-2 text-white
                  transition hover:border-white"
                >
                  <PlusIcon />
                </div>
              </div>
              <div className="text-sm px-4 line-clamp-[7] text-[#d2d2d2]">
                {dd.overview.length > 0 ? dd.overview : "내용이 비어있습니다."}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
