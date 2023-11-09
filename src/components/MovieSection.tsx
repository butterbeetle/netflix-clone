"use client";

import MovieList from "./MovieList";

const movieList = [
  { title: "높은 평점 영화", type: "movie", category: "top_rated" },
  // { title: "현재 상영 영화", type: "movie", category: "now_playing" },
  // { title: "액션 영화",       type: "discover", category: "movie", genres: "28" },
  // { title: "코미디 영화",     type: "discover", category: "movie", genres: "35" },
  // { title: "호러 영화",       type: "discover", category: "movie", genres: "27" },
  // {
  //   title: "애니메이션",
  //   type: "discover",
  //   category: "movie",
  //   genres: "16",
  // },
];

export default function MovieSection() {
  return (
    <section className="relative z-[2] -top-[12.5vw] flex flex-col overflow-x-hidden pt-10">
      {movieList.map(({ title, type, category }) => (
        <MovieList
          key={title}
          title={title}
          type={type}
          category={category}
          // genres={genres ?? null}
        />
      ))}
    </section>
  );
}
