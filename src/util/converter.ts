import genresData from "../data/genres.json";

export function genreConversionToString(genres: number[]) {
  return genres.map((genre) => {
    const genreString = genresData.genres.find((data) => data.id === genre);
    return genreString ? genreString.name : null;
  });
}
