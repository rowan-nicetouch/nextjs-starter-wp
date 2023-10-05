import cleanUrl from 'base/clean/cleanUrl'

export default function readWpUrl (url) {
  url = cleanUrl(url)
  const search = process.env.NEXT_PUBLIC_WP_URL
  const replace = process.env.NEXT_PUBLIC_URL
  return url.replaceAll(search, replace)
}
