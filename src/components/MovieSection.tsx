"use client";

import MovieList from "./MovieList";

const movieList = [
  { title: "최고 평점 영화", type: "movie", category: "top_rated" },
  { title: "지금 뜨는 콘텐츠", type: "trending", category: "all" },
  { title: "액션 영화", type: "discover", category: "movie", genres: "28" },
  { title: "코미디 영화", type: "discover", category: "movie", genres: "35" },
  { title: "호러 영화", type: "discover", category: "movie", genres: "27" },
  {
    title: "애니메이션",
    type: "discover",
    category: "movie",
    genres: "16",
  },
];

export default function MovieSection() {
  return (
    <section className="relative w-full h-full z-[2] -top-[12.5vw]">
      {movieList.map(({ title, type, category, genres }) => (
        <MovieList
          key={title}
          title={title}
          type={type}
          category={category}
          genres={genres ?? null}
        />
      ))}
    </section>
  );
}
