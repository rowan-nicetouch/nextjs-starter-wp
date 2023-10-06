'use strict'
import _readWpYoastMetadata from 'base/read/lib/_readWpYoastMetadata'

export default function readWpPostMetadata (post, fallback) {
  const {
    title,
    description,
    robots,
    openGraph,
    twitter
  } = _readWpYoastMetadata(post?.yoast_head_json)

  const output = {
    metadataBase: process.env.NEXT_PUBLIC_URL,
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
