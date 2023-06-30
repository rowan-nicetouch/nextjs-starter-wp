'use strict'

import cleanText from 'base/clean/cleanText'
import cleanUrl from 'base/clean/cleanUrl'
import readWpUrl from 'base/read/readWpUrl'

export default function readWpYoastOpenGraph (aught) {
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
    const title = cleanText(og_title)
    const url = cleanUrl(og_url)

    if (title && url) {
      return {
        title,
        url: readWpUrl(url),
        description: cleanText(og_description),
        siteName: cleanText(og_site_name),
        images: Array.isArray(og_image) ? og_image : [],
        locale: cleanText(og_locale),
        type: cleanText(og_type),
      }
    } else {
      return null
    }
  })()

  return output
}
