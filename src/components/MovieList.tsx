import MovieCard from "./MovieCard";
import { nowplayingMovie } from "@/model/movie";
import ChevronLeftIcon from "./ui/icons/ChevronLeftIcon";
import ChevronRightIcon from "./ui/icons/ChevronRightIcon";

interface Props {
  title: string;
  movies: nowplayingMovie[] | null;
}
export default function MovieList({ title, movies }: Props) {
  return (
    <>
      {movies ? (
        <div className="px-6 md:px-12 mt-4 space-y-8 z-10">
          <p className="text-white text-md md:text lg:text-2xl font-semibold mb-2">
            {title}
          </p>
          <div className="relative flex  border-orange-300 border-2 w-full h-36 items-center overflow-hidden">
            <button className="absolute left-[-2.5rem] text-white z-10 h-full hover:bg-zinc-700/20 transition">
              <ChevronLeftIcon />
            </button>
            <button className="absolute right-[-2.5rem] text-white z-10 h-full hover:bg-zinc-700/20 transition">
              <ChevronRightIcon />
            </button>
            <div className="absolute grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
