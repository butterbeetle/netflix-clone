"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  name: string | null | undefined;
}

export default function Profile({ name }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="group flex flex-col mx-auto justify-center items-center"
    >
      <div
        className="
        w-[10vw]
      min-w-[80px] max-w-[200px]
      min-h-[80px] max-h-[200px]
      aspect-square
      rounded-md
      flex
      items-center justify-center
      border-2
      border-transparent
      group-hover:cursor-pointer
      group-hover:border-white
      overflow-hidden
    "
      >
        <Image
          className="object-cover w-full"
          src={"/images/default-blue.png"}
          alt="Profile"
          priority
          width={150}
          height={150}
        />
      </div>
      <div className="md:text-[1.5vw] text-gray-400 text-center text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white">
        {name}
      </div>
    </div>
  );
}
