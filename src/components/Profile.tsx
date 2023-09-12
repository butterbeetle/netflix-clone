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
      className="group flex-row w-44 mx-auto"
    >
      <div
        className="
      w-44
      h-44
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
          className="w-fit h-fit"
          src={"/images/default-blue.png"}
          alt="Profile"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white">
        {name}
      </div>
    </div>
  );
}
