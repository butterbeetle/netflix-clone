export const tmdbBaseURL = `https://api.themoviedb.org/3`;
export const tmdbImageURL = `https://image.tmdb.org/t/p`;
export const tmdbVideoURL = `https://www.youtube.com/embed/`;

/**
 * Youtube Link 를 만들어서 반환해주는 함수
 * @param videoKey youtube video key
 * @returns https://www.youtube.com/embed/${videokey}
 */
export function makeYoutubeLink(videoKey: string) {
  return `${tmdbVideoURL}${videoKey}`;
}
