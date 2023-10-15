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

export type ModalContent = Pick<
  Content,
  "id" | "title" | "genre_ids" | "overview" | "backdrop_path"
>;

export type ModalContentInfo = Pick<
  Content,
  "title" | "overview" | "genre_ids"
>;

export type CreditProfile = {
  id: number;
  credit_id: string;
  name: string;
  character: string;
  profile_path: string;
};
