import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <Navbar />
      <BillBoard />
      <MovieSection />
      <Footer />
    </main>
  );
}
