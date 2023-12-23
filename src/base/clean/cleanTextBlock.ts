'use strict'

import { clean } from 'base/clean'

/**
 * Clean text block.
 *
 * For rendering of content entered into a plain multi-line textarea input.
 *
 * This components will:
 *
 *   1. Convert newlines to `<br>` elements.
 *   2. Allow interactive tag: `<a>`.
 *   3. Allow block-level tag: `<br>`.
 *   4. Allow block-level tag: `<hr>`.
 *
 * @see ./cleanHtml() for processing WYSIWYG inputs.
 */
export default function cleanTextBlock (aught:any) : string {
  const withBreaks = typeof aught === 'string'
    ? aught.trim().split("\n").join('<br />')
    : aught

  return clean(withBreaks, {
      ALLOWED_ATTR: [
        'id',
        'class',
        'style',
        'title',
      ],
      ALLOWED_TAGS: [
        'a',
        'abbr',
        'b',
        'bdi',
        'bdo',
        'br',
        'code',
        'del',
        'dfn',
        'em',
        'hr',
        'i',
        'ins',
        'kbd',
        'mark',
        'q',
        's',
        'samp',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'u',
        'var',
        'wbr'
      ]
  })
}
