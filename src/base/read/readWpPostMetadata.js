'use strict'
import _readWpYoastMetadata from 'base/read/_readWpYoastMetadata'

export default function readWpPostMetadata (post, fallback) {
  const {
    title,
    description,
    robots,
    openGraph,
    twitter
  } = _readWpYoastMetadata(post?.yoast_head_json)

  const output = {
    title: (() => {
      const t = title || post?.title?.rendered || fallback?.title || ''
      return typeof t === 'string' ? t : ''
    })(),
    description,
    robots,
    openGraph,
    twitter
  }

  return output
}
