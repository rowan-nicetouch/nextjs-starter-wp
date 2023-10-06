import htmlReactParse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import readWpUrl from 'base/read/readWpUrl'

export function parse (html) {
  return htmlReactParse(html, {
    replace: node => {
      switch (node?.name) {
        case 'a' : {
          const { href, ...atts } = node?.attribs || {}
          const newHref = readWpUrl(href)
          return <Link href={newHref} {...atts}>{node.children[0].data}</Link>
        }
        case 'img' : {
          const { src, ...atts } = node?.attribs || {}
          const newSrc = readWpUrl(src)
          return <Image href={newSrc} {...atts} />
        }
        default : {
          return node
        }
      }
    }}
  )
}
