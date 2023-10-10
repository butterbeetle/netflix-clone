import Image from "next/image";

type Props = {
  key: string;
};

export default function PreviewModalVisual({ key }: Props) {
  return (
    <div className="relative w-full h-1/3">
      <div className="absolute w-full h-full bg-gradient-to-t from-[#181818] to-[#181818]/10"></div>
      <Image
        className="w-full aspect-[16/9] rounded-t-md"
        src={`http://via.placeholder.com/300/FF000/white.png?text=Test`}
        width={100}
        height={100}
        alt="placeholder"
      />
    </div>
  );
}
