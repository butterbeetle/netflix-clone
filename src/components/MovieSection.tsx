"use client";

import useSWR from "swr";
import MovieList from "./MovieList";
import fetcher from "@/lib/fetcher";

export default function MovieSection() {
  const { data: movies = [] } = useSWR("/api/movies/", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return <MovieList title="Trending Now" data={movies} />;
}
