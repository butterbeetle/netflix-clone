import { tmdbBaseURL } from "./tmdb";

type Props = {
  type: string;
  category?: string;
  genres?: string;
};

export async function getTrending({ type, category }: Props) {
  const url = `${tmdbBaseURL}/${type}/${category}/week?language=ko-KR`;
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
      if (category === "all") return data;
      return data[Math.floor(Math.random() * 20)];
    });
}

export async function getTopRatedOf({ type, category }: Props) {
  const url = `${tmdbBaseURL}/${type}/${category}?language=ko-KR&page=1`;
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
export async function getDiscoverOf({ type, category, genres }: Props) {
  const url = `${tmdbBaseURL}/${type}/${category}?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${genres}`;

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
