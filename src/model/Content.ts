export type Content = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type TvContent = Omit<Content, "title" | "release_date"> & {};
