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

type videoType =
  | "Trailer"
  | "Teaser"
  | "Behind the Scenes"
  | "Featurette"
  | "Clip";

/**
 * 영어로 된 type을 한글로 반환해주는 함수
 * @param type videoType
 */
export function engVideoTypeToKR(type: videoType) {
  if (type === "Teaser") return "티저 영상";
  else if (type === "Behind the Scenes") return "비하인드 영상";
  else if (type === "Featurette") return "스폐셜 피쳐 영상";
  else if (type === "Clip") return "클립 영상";
  else return "트레일러";
}
