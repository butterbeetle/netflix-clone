import { prisma } from "@/lib/prismadb";

export async function getMovieList() {
  const moviesCount = await prisma.movie.count();
  const randomIndex = Math.floor(Math.random() * moviesCount);

  const randomMovies = await prisma.movie.findMany({
    take: 1,
    skip: randomIndex,
  });

  return randomMovies;
}
