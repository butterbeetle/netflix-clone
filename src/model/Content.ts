export type Content = {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  vote_average: number;
};

export type DetailContent = Omit<
  Content,
  "genre_ids" | "first_air_date" | "name"
> & {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
};

export type ModalContent = Pick<
  Content,
  "id" | "title" | "genre_ids" | "overview" | "backdrop_path"
>;

export type ModalContentInfo = Pick<
  ModalContent,
  "title" | "overview" | "genre_ids"
>;
export type BannerContent = Pick<
  ModalContent,
  "title" | "overview" | "backdrop_path"
>;

export type ModalContentVideo = {
  id: string;
  key: string;
  name: string;
  published_at: string;
  type: string;
};

export type ActorContent = {
  id: number;
  credit_id: string;
  name: string;
  character: string;
  profile_path: string;
};
