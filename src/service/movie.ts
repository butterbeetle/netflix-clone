import { Content } from "@/model/Content";
import { tmdbBaseURL } from "./tmdb";

type DiscoverProps = {
  category: string;
  genre: string;
};

/**
 * GET api.themoviedb.org/3/discover/${category} data
 * @see https://developer.themoviedb.org/reference/discover-movie
 * @param category "movie" | "tv"
 * @param genre genre
 * @returns discover data
 */
export async function getDiscoverOf({ category, genre }: DiscoverProps) {
  const url = `${tmdbBaseURL}/discover/${category}?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${genre}`;

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

type MovieProps = {
  type: string;
  option?: string;
};
/**
 * GET api.themoviedb.org/3/movie/${type} data
 * @see https://developer.themoviedb.org/reference/movie-top-rated-list
 * @param type - "now_playing"|"top_rated"|"upcoming"
 * @param option top_rated
 * @returns ${type} data
 */
export async function getMovieList({ type, option }: MovieProps) {
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
 * GET api.themoviedb.org/3/movie/{movie_id}/{option}} data
 * @see https://developer.themoviedb.org/reference/movie-videos
 * @param type Movie Id
 * @param option "videos" | "credits" | "similar" | "recommendations"
 * @return movie data
 */
export async function getMovie({ type, option }: MovieProps) {
  let url = `${tmdbBaseURL}/movie/${type}`;
  if (option !== "detail") {
    url += `/${option}?language=ko-KR`;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  return await fetch(url, options)
    .then((res) => res.json()) //
    .then((data) => {
      if (option === "credits") return data.cast.slice(0, 18);
      else if (
        option === "videos" ||
        option === "similar" ||
        option === "recommendations"
      ) {
        return data.results
          .slice(0, 18)
          .filter((video: Content) => video.backdrop_path !== null);
      } else if (option === "detail") {
        return data;
      }
    });
}
