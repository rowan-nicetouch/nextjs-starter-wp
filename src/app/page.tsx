import { wpGetPages, wpGetPosts } from 'base/fetch'
import { notFound } from 'next/navigation'
import { parse } from 'base/parse'

import { readWpPost } from 'base/read'

export default async function Home () {
  // const page = await fetchPage()
  const post = await fetchPost()
  const { title, excerpt } = post
  return (
    <main>
      <h1>{parse(title)}</h1>
      <div>{parse(excerpt)}</div>
    </main>
  )
}

async function fetchPage () {
  try {
    const pages = await wpGetPages(
      { slug: 'home', _embed: true },
      { cache: 'no-cache'}
    )
    return readWpPost(pages[0])
  } catch (error) {
    console.error(error)
    notFound()
  }
}
async function fetchPost () {
  try {
    const posts = await wpGetPosts(
      { include: '1', _embed: true },
      { cache: 'no-cache'}
    )
    return readWpPost(posts[0])
  } catch (error) {
    console.error(error)
    notFound()
  }
}
