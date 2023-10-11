import { tmdbBaseURL } from "./tmdb";

type Props = {
  type: string;
  category: string;
  option?: string | number;
};

type MovieListProps = {
  type: string;
  option: string;
};
/**
 * GET api.themoviedb.org/3/movie/top_rated data
 * @see https://developer.themoviedb.org/reference/movie-top-rated-list
 * @param type - "now_playing"|"top_rated"|"upcoming"
 * @param option top_rated
 * @returns top_rated data
 */
export async function getMovieList({ type, option }: MovieListProps) {
  const url = `${tmdbBaseURL}/movie/${type}?language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  return await fetch(url, options)
    .then((res) => res.json()) //
    .then((data) => data.results)
    .then((data) => {
      if (option !== "banner") return data;
      return data[Math.floor(Math.random() * 20)];
    });
}

/**
 * GET api.themoviedb.org/3/discover/${category} data
 * @see https://developer.themoviedb.org/reference/discover-movie
 * @param type - "discover"
 * @param category "movie" | "tv"
 * @param option genre
 * @returns discover data
 */
export async function getDiscoverOf({ type, category, option }: Props) {
  const url = `${tmdbBaseURL}/${type}/${category}?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${option}`;

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

type VideoProps = {
  movieId: string;
};
/**
 * GET api.themoviedb.org/3/movie/{movie_id}/videos data
 * @see https://developer.themoviedb.org/reference/movie-videos
 * @param movieId Movie Id
 * @return video data
 */
export async function getMovieVideo({ movieId }: VideoProps) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`;

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
