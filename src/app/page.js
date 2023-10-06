import { wpGetPages } from 'base/fetch/wpGetPages'
import { notFound } from 'next/navigation'
// import parse from 'html-react-parser'
import { parse } from 'base/parse'

async function getPage () {
  try {
    const pages = await wpGetPages({
      slug: 'home',
      _embed: true,
    }, {
      cache: 'no-cache'
    })
    return pages[0]
  } catch (error) {
    console.error(error)
    notFound()
  }
}

export default async function Home () {
  const page = await getPage()
  return (
    <main>
      <h1>{parse(page.title)}</h1>
      <div>{parse(page.content)}</div>
    </main>
  )
}
