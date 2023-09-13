import { prisma } from "@/lib/prismadb";

export async function getRandomMovie() {
  const moviesCount = await prisma.movie.count();
  const randomIndex = Math.floor(Math.random() * moviesCount);

  const randomMovie = await prisma.movie.findMany({
    take: 1,
    skip: randomIndex,
  });

  return randomMovie[0];
}

export async function getMovieList() {
  const movies = await prisma.movie.findMany();

  return movies;
}
