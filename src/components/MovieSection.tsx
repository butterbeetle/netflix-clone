"use client";

import MovieList from "./MovieList";
import { useSearchParams } from "next/navigation";
import Modal from "./ui/Modal";
import ModalPortal from "./ui/ModalPortal";
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
  const params = useSearchParams();
  const modalId = params.get("id");
  return (
    <section className="relative z-[2] -top-[12.5vw] lg:-top-[17vw] flex flex-col">
      {movieList.map(({ title, type, category }) => (
        <MovieList
          key={title}
          title={title}
          type={type}
          category={category}
          // genres={genres ?? null}
        />
      ))}
      {modalId && (
        <ModalPortal>
          <Modal id={modalId} />
        </ModalPortal>
      )}
    </section>
  );
}
