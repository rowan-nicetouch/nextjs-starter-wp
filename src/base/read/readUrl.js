/**
 * Reads a value expected to be a URL.
 *
 * @param {any} aught
 * @returns {String}
 */
export default function readUrl (aught) {
  try {
    const url = new URL(aught)
    return !aught.endsWith('/') && url.pathname === '/'
      ? url.href.slice(0, -1)
      : url.href
  } catch (error) {
    return ''
  }
}
