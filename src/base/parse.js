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
          const { alt, height, src, width, ...orig } = node?.attribs || {}
          const atts = { alt, height, src, width }
          if (orig.class) {
            atts.className = orig.class
            delete(orig.class)
          }
          return <Image {...atts} />
        }
        default : {
          return node
        }
      }
    }
  }
  return htmlReactParse(html, options)
}
