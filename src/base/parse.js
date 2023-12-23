import htmlReactParse, { domToReact } from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { readWpUrl } from 'base/read'

export function parse (html) {
  const options = {
    replace: node => {
      switch (node?.name) {
        case 'a' : {
          const { href, ...orig } = node?.attribs || {}
          const atts = {
            href: readWpUrl(href)
          }
          if (orig.class) {
            atts.className = orig.class
          }
          return (
            <Link {...atts}>
              {domToReact(node?.children, options)}
            </Link>
          )
        }
        case 'img' : {
          const { alt, height, src, width, ...orig } = node?.attribs || {}
          const atts = { alt, height, src, width }
          if (orig.class) {
            atts.className = orig.class
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
