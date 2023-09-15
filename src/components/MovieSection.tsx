"use client";

import useSWR from "swr";
import MovieList from "./MovieList";
import fetcher from "@/lib/fetcher";
import { nowplayingMovie } from "@/model/movie";

export default function MovieSection() {
  const { data } = useSWR<nowplayingMovie[]>(
    "/api/movie/now_playing/",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(data);
  return <div>TEST</div>;
}
