import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="text-white flex gap-2">
      <div>hi</div>
      <Link href={"/login/1"}>/login</Link>
    </div>
  );
}
