/**
 * Read featured image from post object.
 *
 * @param {Object} aught - The post from which to read the feature image.
 * @todo Hook up image reader.
 */
export default function _readWpFeaturedImageFromPost (aught) {
  aught = typeof aught === 'object' ? aught : {}

  const mediaId = typeof aught?.featured_media === 'number'
    ? aught?.featured_media
    : 0

  const mediaItems = Array.isArray(aught?._embedded?.['wp:featuredmedia'])
    ? aught?._embedded?.['wp:featuredmedia']
    : []

  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i] || {}
    const { id, media_type } = item
    if (id === mediaId && media_type === 'image') {
      return item
    }
  }

  return null
}
