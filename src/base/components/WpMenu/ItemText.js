import Link from 'next/link'

export default function ItemText (props) {
  const { currentPath, onFocus, linkText, src } = props
  const isCurrentPage = ((currentPath, src) => {
    const srcPath = src.slice(process.env.NEXT_PUBLIC_URL.length)
    return srcPath === currentPath
  })(currentPath, src)
  const isLinked = Boolean(src) && src !== '#none'

  const link = (
    <Link
      className="menu-item-text"
      href={src}
      onFocus={onFocus}
    >{linkText}</Link>
  )

  const span = (
    <span
      className="menu-item-text"
      data-is-heading=''
      tabIndex="0"
      onFocus={onFocus}
    >{linkText}</span>
  )

  const currentPageIndicator = (
    <span
      className="menu-item-text"
      data-is-current-page=''
      tabIndex="0"
      onFocus={onFocus}
    >
      <span className="visually-hidden">Current Page: </span>
      {linkText}
    </span>
  )

  if (isCurrentPage) {
    return currentPageIndicator
  } else if (isLinked) {
    return link
  } else {
    return span
  }
}
