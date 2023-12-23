'use strict'

import { Metadata } from 'next'
import { cleanPlainText } from 'base/clean'
import { readUrl, readWpUrl } from 'base/read'

export function readYoastSeo (aught:any) : Metadata {
  const { yoast_head_json } = aught || {}
  const { description, title, robots } = yoast_head_json || {}

  return {
    title: cleanPlainText(title),
    description: cleanPlainText(description),
    openGraph: readOpenGraph(yoast_head_json),
    robots: readRobots(robots),
    twitter: readTwitter(yoast_head_json),
  }
}
function readOpenGraph (aught:any) {
  const {
    og_title,
    og_url,
    og_description,
    og_site_name,
    og_image,
    og_locale,
    og_type
  } = aught || {}

  const output = (() => {
    const title = cleanPlainText(og_title)
    const url = readUrl(og_url)

    if (title && url) {
      return {
        title,
        url: readWpUrl(url),
        description: cleanPlainText(og_description),
        siteName: cleanPlainText(og_site_name),
        images: Array.isArray(og_image) ? og_image : [],
        locale: cleanPlainText(og_locale),
        type: cleanPlainText(og_type),
      }
    } else {
      return null
    }
  })()

  return output
}

type MaxVideoPreview = number | string
type MaxImagePreview = 'none' | 'standard' | 'large' | undefined

/**
 * @see: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
 */
function readRobots (aught:any) {
  const index = typeof aught?.index === 'string' ? aught.index : null

  const follow = typeof aught?.follow === 'string' ? aught.follow : null

  const maxSnippet = aught?.snippet === 'nosnippet' ? 0 : -1

  const maxImagePreview = (() : MaxImagePreview => {
    switch (aught?.['max-image-preview'] ?? '') {
      case 'none' :
        return 'none'
      case 'standard' :
        return 'standard'
      case 'large' :
        return 'large'
      default :
        return undefined
    }
  })()

  const maxVideoPreview = (() : MaxVideoPreview => {
    if (typeof aught?.['max-video-preview'] === 'string') {
      const parts = aught['max-video-preview'].split(':')
      if (parts[1]) {
        return parts[1]
      }
    }
    return 0
  })()

  const nocache = (
    typeof aught?.archive === 'string' &&
    aught.archive === 'noarchive'
  ) ? true : false

  const noimageindex = (
    typeof aught?.imageindex === 'string' &&
    aught.imageindex === 'noimageindex'
  ) ? true : false

  return {
    index,
    follow,
    nocache,
    noimageindex,
    googleBot: {
      index,
      follow,
      ['max-snippet']: maxSnippet,
      ['max-image-preview']: maxImagePreview,
      ['max-video-preview']: maxVideoPreview,
    }
  }
}
function readTwitter (aught:any) {
  const {
    twitter_card,
    twitter_title,
    twitter_description,
    twitter_image,
    twitter_site
  } = aught || {}


  const card = cleanPlainText(twitter_card)
  const title = cleanPlainText(twitter_title)
  const description = cleanPlainText(twitter_description)
  const image = readUrl(twitter_image)
  const creator = cleanPlainText(twitter_site)

  const values = [card, title, description, image, creator]
  if (values.filter(Boolean).length === 0) {
    return null
  }

  const output = {
    card,
    creator,
    description,
    title,
    images: [ image ],
  }

  return output
}
