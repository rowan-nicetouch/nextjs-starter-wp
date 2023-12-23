/**
 * Default Page Template
 */
import { notFound } from 'next/navigation'
import { wpGetPages } from 'base/fetch'
import { parse } from 'base/parse'

async function getPage (segment) {
  try {
    const pages = await wpGetPages({
      slug: segment,
      _embed: true,
    }, {
      cache: 'no-cache'
    })
    return pages[0]
  } catch (error) {
    notFound()
  }
}

export async function generateMetadata (props) {
  const { params } = props
  const { segment } = params
  const page = await getPage(segment)
  return page.seo
}

export default async function Page (props) {
  const { params } = props
  const { segment } = params

  const page = await getPage(segment)

  return (
    <main>
      <h1>{parse(page.title)}</h1>
      <div>{parse(page.content)}</div>
    </main>
  )
}
