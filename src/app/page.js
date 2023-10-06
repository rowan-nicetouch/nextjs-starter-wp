import { wpGetPages } from 'base/fetch/wpGetPages'
import { notFound } from 'next/navigation'

export default async function Home () {

  const page = await getPage()
  return (
    <main>

    </main>
  )
}

async function getPage () {
  try {
    const pages = await wpGetPages({
      slug: 'home',
      _embed: true,
    }, {
      cache: 'no-cache'
    })
    console.dir(pages[0], { depth: null })
    return pages[0]
  } catch (error) {
    console.error(error)
    notFound()
  }
}
