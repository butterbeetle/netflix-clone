import fetcher from "@/lib/fetcher";
import { signOut } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";

interface Props {
  visible?: boolean;
}
export default function AccountMenu({ visible }: Props) {
  const { data: user } = useSWR("/api/current", fetcher);
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 right-[-5px] py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-2 group/item flex flex-row gap-3 items-center w-full">
          <Image
            className="object-cover rounded-md w-8"
            src="/images/default-blue.png"
            alt="profile"
            priority
            width={100}
            height={100}
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          넷플릭스에서 로그아웃
        </div>
      </div>
    </div>
  );
}
