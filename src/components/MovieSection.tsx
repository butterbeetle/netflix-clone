"use client";

import useSWR from "swr";
import MovieList from "./MovieList";
import fetcher from "@/lib/fetcher";
import { nowplayingMovie } from "@/model/movie";

export default function MovieSection() {
  const { data: movies } = useSWR<nowplayingMovie[]>(
    "/api/movie/now_playing/",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <section className="pb-40">
      <MovieList title={"지금 상영중"} movies={movies ?? null} />;
    </section>
  );
}
