'use strict'
/**
 * Read Yoast Robots Data.
 *
 * Translates robots metadata from the Yoast SEO format into a format usable by
 * Nextjs's metadata API.
 */
export default function readWpYoastRobots (aught) {
  const index = typeof aught?.index === 'string' ? aught.index : null

  const follow = typeof aught?.follow === 'string' ? aught.follow : null

  const nocache = (
    typeof aught?.archive === 'string' &&
    aught.archive === 'noarchive'
  ) ? true : false

  const noimageindex = (
    typeof aught?.imageindex === 'string' &&
    aught.imageindex === 'noimageindex'
  ) ? true : false

  const output = {
    index,
    follow,
    nocache,
    noimageindex,
    googleBot: {
      index,
      follow,
    }
  }

  if (typeof aught?.['snippet'] === 'string' && aught?.['snippet'] === 'nosnippet') {
    output.googleBot['max-snippet'] = -1
  }

  if (typeof aught?.['max-image-preview'] === 'string') {
    const parts = aught['max-image-preview'].split(':')
    if (parts[1]) {
      output.googleBot['max-image-preview'] = parts[1]
    }
  }

  if (typeof aught?.['max-video-preview'] === 'string') {
    const parts = aught['max-video-preview'].split(':')
    if (parts[1]) {
      output.googleBot['max-video-preview'] = parts[1]
    }
  }

  return output
}
