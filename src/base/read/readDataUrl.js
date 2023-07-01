import cleanUrl from 'base/clean/cleanUrl'

export default function readDataUrl (url) {
  const search = process.env.NEXT_PUBLIC_WP_URL
  const replace = process.env.NEXT_PUBLIC_URL

  const replaced = (() => {
    if (typeof url !== 'string') {
      return url
    } else if (search.slice(-1) === '/' && replace.slice(-1) === '/') {
      return url.replaceAll(search, replace)
    } else if (search.slice(-1) === '/') {
      return url.replaceAll(search, replace + '/')
    } else if (replace.slice(-1) === '/') {
      return url.replaceAll(search + '/', replace)
    } else {
      return url.replaceAll(search + '/', replace + '/')
    }
  })()

  return cleanUrl(replaced)
}
