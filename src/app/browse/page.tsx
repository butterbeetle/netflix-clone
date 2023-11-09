import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function MoviePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <Navbar />
      <Banner />
      <MovieSection />
      <Footer />
    </>
  );
}
