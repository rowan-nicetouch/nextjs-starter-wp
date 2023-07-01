import clean from 'base/clean/clean'
import { ATTS, TEXT_TAGS } from 'base/clean/values'

/**
 * Clean Text Block.
 *
 * For rendering of content entered into a multi-line textarea input.
 *
 * This components will:
 *
 *   1. Convert newlines to `<br>` elements.
 *   2. Allow only links and text tags.
 */
export default function cleanTextBlock (aught) {
  const withBreaks = typeof aught === 'string'
    ? aught.trim().split("\n").join('<br />')
    : aught

  return clean(withBreaks, {
    ALLOWED_ATTR: ATTS,
    ALLOWED_TAGS: ['a', 'br', ...TEXT_TAGS]
  })
}
