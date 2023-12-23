import { readUrl } from 'base/read'
/**
 * Reads a URL stored in WordPress.
 *
 * This function will translate the WordPress URL to the Next.js URL.
 * Other URLs should pass though unaltered.
 */
export function readWpUrl (url:any) : string {
  url = readUrl(url)
  const search = process.env.NEXT_PUBLIC_WP_URL
  const replace = process.env.NEXT_PUBLIC_URL
  return url.replaceAll(search, replace)
}
