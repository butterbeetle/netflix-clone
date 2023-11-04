"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";

import _ from "lodash";
import Link from "next/link";

export default function MoviePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const detailId = searchParams.get("id");

  const showDetailModal = !_.isNil(detailId);

  const data = [123, 456, 1234, 12345];
  return (
    <>
      <main className="w-full justify-center flex flex-col gap-2 items-center bg-amber-200">
        {data.map((v) => (
          <Link
            className="text-white "
            key={v}
            href={`/movie?id=${v}`}
            as={`/movie/[id]`}
            scroll={false}
          >
            {v} Click Me !
          </Link>
        ))}
      </main>
      {showDetailModal && <div>{detailId}</div>}
    </>
  );
}
