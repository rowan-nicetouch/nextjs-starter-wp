/**
 * Reaf ACF fields.
 *
 * ACF may reaturn an array or a plain object.
 */
export default function _readAcf (aught) {
  if (Array.isArray(aught)) {
    return aught
  } else if (typeof aught === 'object') {
    return aught
  } else {
    return {}
  }
}
