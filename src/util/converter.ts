import genresData from "../data/genres.json";
/**
 * number형식으로 된 장르를 string 형식으로 변경해주는 함수
 * @param genres number[]
 * @returns genres string[]
 */
export function genreConversionToString(genres: number[]): string[] {
  return genres.map((genre) => {
    return genresData.genres.find((data) => data.id === genre)!.name;
  });
}
