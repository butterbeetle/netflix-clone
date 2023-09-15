import { prisma } from "@/lib/prismadb";
import { tmdbBaseURL } from "./tmdb";

export async function getRandomMovie() {
  const moviesCount = await prisma.movie.count();
  const randomIndex = Math.floor(Math.random() * moviesCount);

  const randomMovie = await prisma.movie.findMany({
    take: 1,
    skip: randomIndex,
  });

  return randomMovie[0];
}

export async function getNowPlayingMovie() {
  const url = `${tmdbBaseURL}/movie/now_playing/?language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  return await fetch(url, options)
    .then((res) => res.json()) //
    .then((data) => data.results);
}
