/**
 * "2016-12-12T21:58:05.000Z" -> "2016-12-12"
 * @param published published_at
 */
export function publishedFormat(published: string) {
  return published.slice(0, 10);
}
