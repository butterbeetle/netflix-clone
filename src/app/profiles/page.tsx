import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Profile from "@/components/Profile";

export default async function ProfilesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center h-full ">
        <div className="flex flex-col px-12">
          <h1 className="text-3xl md:text-[3.5vw] text-white text-center">
            넷플릭스를 시청할 프로필을 선택하세요.
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <Profile name={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
