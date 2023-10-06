import htmlReactParse, { domToReact } from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import readWpUrl from 'base/read/readWpUrl'

export function parse (html) {
  const options = {
    replace: node => {
      switch (node?.name) {
        case 'a' : {
          const { href, ...atts } = node?.attribs || {}
          const newHref = readWpUrl(href)
          return (
            <Link href={newHref} {...atts}>
              {domToReact(node?.children, options)}
            </Link>
          )
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
    }
  }
  return htmlReactParse(html, options)
}
