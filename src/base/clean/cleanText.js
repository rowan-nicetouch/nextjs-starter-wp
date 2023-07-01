import clean from 'base/clean/clean'

/**
 * Plain Text
 *
 * For use in contexts where plain text is expected.
 * This function will strip all HTML tags.
 *
 * @param {Mixed} aught - The value to sanitize.
 * @param {String} The sanitized string.
 */
export default function cleanText (aught) {
  return clean(aught, { ALLOWED_TAGS: [] })
}
