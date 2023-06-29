export default function cleanUrl (aught) {
  try {
    const url = new URL('', aught)
    return !aught.endsWith('/') && url.pathname === '/'
      ? url.href.slice(0, -1)
      : url.href
  } catch (error) {
    return ''
  }
}
