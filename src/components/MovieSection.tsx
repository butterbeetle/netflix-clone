"use client";

import MovieList from "./MovieList";

export default function MovieSection() {
  return (
    <section>
      <MovieList title={"지금 상영중"} category={"now_playing"} />
      <MovieList title={"인기있는 영화"} category={"popular"} />
      <MovieList title={"곧 개봉하는 영화"} category={"upcoming"} />
    </section>
  );
}
