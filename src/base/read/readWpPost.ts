'use strict'

import {
  cleanHeading,
  cleanHtml,
  cleanPlainText,
  cleanPositiveIntegerArray,
  cleanWholeNumber
} from 'base/clean'

import {
  readWpDate,
  readWpFeaturedImage,
  readWpRenderedString,
  readWpTerm,
  readWpUrl
} from 'base/read'

import { WpPost, WpTerm } from 'base/types'

/**
 * Read a WordPress Post object.
 *
 * This function is intended to be used with post objects with a `post_type`
 * value of `post`. It accounts for the most commonly used properties supported
 * by WordPress core.
 *
 * Features:
 *
 *   1. Creates array of category objects.
 *   2. Creates array of tag objects.
 *   3. Isolates the first featured media object.
 *
 * Considerations:
 *
 *   - Zero support is provided for password-protected posts.
 *   - Zero support is provided for the "guid" property.
 *   - The "meta" array will pass through without alteration.
 *   - The "acf" array will pass through without alteration.
 *
 * @todo Add support for author embeds.
 *
 * @param {Object} aught
 */
export function readWpPost (aught?:any) : WpPost {
  aught = typeof aught === 'object' ? aught : {}

  // Embedded taxonomy terms.
  const { categories, tags, terms } = readWpPostTerms(aught)

  // Embedded featured image.
  const featuredImage = readWpFeaturedImage(aught)

  const output = {
    authorId: cleanWholeNumber(aught?.author),
    author: null, // @todo
    categoryIds: cleanPositiveIntegerArray(aught?.categories),
    categories,
    commentStatus: cleanPlainText(aught?.comment_status),
    content: cleanHtml(readWpRenderedString(aught?.content)),
    dateModified: readWpDate(aught?.modified),
    dateModifiedUtc: readWpDate(aught?.modified_gmt),
    datePublished: readWpDate(aught?.date),
    datePublishedUtc: readWpDate(aught?.date_gmt),
    excerpt: cleanHtml(readWpRenderedString(aught?.excerpt)),
    featuredMediaId: cleanWholeNumber(aught?.featured_media),
    featuredImage,
    format: cleanPlainText(aught?.format),
    id: cleanWholeNumber(aught?.id),
    link: readWpUrl(aught?.link),
    meta: Array.isArray(aught?.meta) ? aught?.meta : [],
    pingStatus: cleanPlainText(aught?.ping_status),
    slug: cleanPlainText(aught?.slug),
    status: cleanPlainText(aught?.status),
    sticky: Boolean(aught?.sticky),
    tagIds: cleanPositiveIntegerArray(aught?.tags),
    tags,
    template: cleanPlainText(aught?.template),
    terms,
    title: cleanHeading(readWpRenderedString(aught?.title)),
    type: cleanPlainText(aught?.type),
  }

  return output
}

type WpTermMap = {
  categories: Array<WpTerm>,
  tags: Array<WpTerm>,
  terms: Array<WpTerm>,
}

/**
 *
 * @param aught Response data for a single wordpress post.
 */
export default function readWpPostTerms (aught:any) : WpTermMap {
  const allTerms = Array.isArray(aught?._embedded?.['wp:term'])
    ? aught?._embedded?.['wp:term']
    : []

  const categories:Array<WpTerm> = []
  const tags:Array<WpTerm> = []
  const terms:Array<WpTerm> = []

  allTerms.forEach((group:any) => {
    group = Array.isArray(group) ? group : []
    group.forEach((term:any) => {
      term = readWpTerm(term)
      switch (term.taxonomy) {
        case 'category' :
          categories.push(term)
          break
        case 'post_tag' :
          tags.push(term)
          break
        default:
          terms.push(term)
          break
      }
    })
  })

  return { categories, tags, terms }
}
