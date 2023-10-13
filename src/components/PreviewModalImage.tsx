import { tmdbImageURL } from "@/service/tmdb";
import Image from "next/image";

type Props = {
  imgPath: string;
};

export default function PreviewModalImage({ imgPath }: Props) {
  return (
    <div className="relative w-full aspect-video">
      <div
        className="absolute w-full h-full
bg-gradient-to-t from-[#181818] to-[#181818]/10 to-50%"
      />
      <Image
        className="w-full rounded-t-md"
        src={`${tmdbImageURL}/original/${imgPath}`}
        width={400}
        height={400}
        alt="placeholder"
      />
    </div>
  );
}
