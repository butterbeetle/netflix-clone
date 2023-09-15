import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { nowplayingMovie } from "@/model/movie";

interface Props {
  title: string;
  movies: nowplayingMovie[] | null;
}
export default function MovieList({ title, movies }: Props) {
  if (isEmpty(movies)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
