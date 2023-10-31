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

/**
 * 00:00 형식으로 시간을 포맷팅 해주는 함수
 * @param time 123.456 형식의 시간
 * @returns 3:52, 4:22 ...
 */
export function formatTime(time: number | string) {
  if (isNaN(Number(time))) {
    return "00:00";
  }

  const date = new Date(Number(time) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  // console.log(hours, minutes, seconds);
  if (hours) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")} `;
  } else {
    return `${minutes}:${seconds}`;
  }
}
