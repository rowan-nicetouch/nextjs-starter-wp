/**
 * Reads a value expected to be a URL.
 */
export function readUrl (aught:any) : string {
  try {
    const url = new URL(aught)
    return !aught.endsWith('/') && url.pathname === '/'
      ? url.href.slice(0, -1)
      : url.href
  } catch (error) {
    return ''
  }
}
