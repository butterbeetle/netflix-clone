export const tmdbBaseURL = `https://api.themoviedb.org/3`;
export const tmdbImageURL = `https://image.tmdb.org/t/p`;
export const tmdbVideoURL = `https://www.youtube.com/embed/`;
export const tmdbVideoThumbnailBaseURL = `https://img.youtube.com/vi/`;

/**
 * Youtube URL 만들어서 반환해주는 함수
 * @param videoKey youtube video key
 * @returns https://www.youtube.com/embed/${videokey}
 */
export function makeYoutubeURL(videoKey: string) {
  return `${tmdbVideoURL}${videoKey}`;
}

/**
 * Youtube Thumbnail URL 만들어서 반환해주는 함수
 * @param videoKey youtube video key
 * @returns https://img.youtube.com/vi/${videokey}/0.jpg
 */
export function makeYoutubeThumbnailIURL(videoKey: string) {
  return `${tmdbVideoThumbnailBaseURL}${videoKey}/0.jpg`;
}
