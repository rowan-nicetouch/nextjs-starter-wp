'use strict'

import cleanHeading from 'base/clean/cleanHeading'
import cleanHtml from 'base/clean/cleanHtml'
import cleanPlainText from 'base/clean/cleanPlainText'
import cleanWholeNumber from 'base/clean/cleanWholeNumber'
import cleanWholeNumberArray from 'base/clean/cleanWholeNumberArray'
import readWpDate from 'base/read/readWpDate'
import readWpUrl from 'base/read/readWpUrl'

import _readWpFeaturedImageFromPost from 'base/read/_readWpFeaturedImageFromPost'
import _readWpPostTerms from 'base/read/_readWpPostTerms'
import _readWpRenderedString from 'base/read/_readWpRenderedString'

/**
 * Read a WordPress Post object.
 *
 * This function is intended to be used with post objects with a `post_type`
 * value of `post`. It accounts for the most commonly used properties.
 *
 * Features:
 *
 *   1. Creates array of category objects.
 *   2. Creates array of tag objects.
 *   3. Isolates the first featured media object.
 *
 * Limitations
 *
 *   - This method provides zero support for password-protected posts.
 *   - This method provides zero support for the guid property.
 *
 * @param {Object} aught
 */
export default function readWpPost (aught) {
  console.log('aught',aught)
  aught = typeof aught === 'object' ? aught : {}

  const output = {
    authorId: cleanWholeNumber(aught?.author),
    author: null,
    categoryIds: cleanWholeNumberArray(aught?.categories),
    categories: [],
    commentStatus: cleanPlainText(aught?.comment_status),
    content: cleanHtml(_readWpRenderedString(aught?.content)),
    dateModified: readWpDate(aught?.modified),
    dateModifiedUtc: readWpDate(aught?.modified_gmt),
    datePublished: readWpDate(aught?.date),
    datePublishedUtc: readWpDate(aught?.date_gmt),
    excerpt: cleanHtml(_readWpRenderedString(aught?.excerpt)),
    featuredMediaId: cleanWholeNumber(aught?.featured_media),
    featuredImage: null,
    format: cleanPlainText(aught?.format),
    id: cleanWholeNumber(aught?.id),
    link: readWpUrl(aught?.link),
    pingStatus: cleanPlainText(aught?.ping_status),
    slug: cleanPlainText(aught?.slug),
    status: cleanPlainText(aught?.status),
    tagIds: cleanWholeNumberArray(aught?.tags),
    tags: [],
    template: cleanPlainText(aught?.template),
    terms: [],
    title: cleanHeading(_readWpRenderedString(aught?.title)),
    type: cleanPlainText(aught?.type),
  }

  // When term objects are embedded.
  if (Array.isArray(aught?._embedded?.['wp:term'])) {
    const { categories, tags, terms } = _readWpPostTerms(
      aught?._embedded?.['wp:term']
    )
    output.categories = categories
    output.tags = tags
    output.terms = terms
  }

  // When featured media objects are embedded.
  if (Array.isArray(aught?._embedded?.['wp:featuredmedia'])) {
    output.featuredImage = _readWpFeaturedImageFromPost(aught)
  }

  return output
}

/*

TODO

  // EMBEDS
  "author": 1,

  "sticky": false,

  // These need to be custom - they can be anything
  "meta": [],
  "acf": { },
*/
