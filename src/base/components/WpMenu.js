'use client'

import { useEffect, useRef, useState } from 'react'

const PATH_SEPERATOR = '/'

export default function WpMenu (props) {
  const { menuItems, ...atts } = props
  const [ activePath, setActivePath ] = useState('')
  const [ focusPath, setFocusPath ] = useState('')
  const menuRef = useRef()
  const depth = 0

  const updateActivePath = (targetPath) => {
    if (targetPath === activePath) {
      // Toggle a leaf when opened.
      setActivePath(expandActivePath(activePath).slice(0, -1).join(PATH_SEPERATOR))
    } else if (activePath.indexOf(targetPath) === 0) {
      // Toggle an internal node when opened.
      setActivePath(expandActivePath(activePath).slice(-1).join(PATH_SEPERATOR))
    } else {
      setActivePath(targetPath)
    }
  }

  // Close all submenus when the main menu is tabbed out of.
  useEffect(() => {
    const test = (event) => {
      const isMenuFocused = typeof menuRef?.current?.contains === 'function'
        ? menuRef?.current?.contains(event.target)
        : false

      if (!isMenuFocused) {
        setActivePath('0')
      }
    }
    window.addEventListener('focusin', test)
    return () => window.removeEventListener('focusin', test)
  }, [])

  // Close an individual submenu when it is tabbed out of.
  useEffect(() => {
    const active = expandActivePath(activePath)
    const focus = expandActivePath(focusPath)

    if (
      activePath !== focusPath &&
      active.length === focus.length &&
      active.length > 1
    ) {
      setActivePath(expandActivePath(activePath).slice(0, -1).join(PATH_SEPERATOR))
    }
    console.log('AP', activePath)
    console.log('FP', focusPath)
  }, [focusPath])

  return (
    <nav ref={menuRef} data-menu>
      <ul {...atts} data-menu-depth={depth}>
        {
          menuItems.map(item => {
            return <WpMenuItem
              activePath={activePath}
              key={item?.id}
              handleFocus={setFocusPath}
              handleMenuOpen={updateActivePath}
              parentPath="0"
              parentDepth={depth}
              {...item}
            />
          })
        }
      </ul>
    </nav>
  )
}

function WpMenuItem (props) {
  const {
    activePath,
    children,
    handleFocus,
    handleMenuOpen,
    id,
    linkText,
    parentDepth,
    parentPath,
    src
  } = props

  const depth = parentDepth + 1
  const hasChildren = children?.length > 0
  const path = parentPath + PATH_SEPERATOR + id

  const isOpen = (() => {
    const path = expandActivePath(activePath)
    return path.includes(id)
  })()

  const submenu = hasChildren
    ? (
      <ul
        className="submenu"
        data-menu-depth={depth}
        data-menu-is-open={isOpen}
      >
        {children.map(item => {
          return <WpMenuItem
            activePath={activePath}
            key={item.id}
            handleFocus={handleFocus}
            handleMenuOpen={handleMenuOpen}
            parentDepth={depth}
            parentPath={path}
            {...item}
          />
        })}
      </ul>
    )
    : null

  const handleItemFocus = () => {
    handleFocus(path)
  }

  return (
    <li>
      <ControlMenuItem
        hasChildren={hasChildren}
        isOpen={isOpen}
        onFocus={handleItemFocus}
        onToggle={() => { handleMenuOpen(path) }}
        linkText={linkText}
        src={src}
      />
      {submenu}
    </li>
  )
}


function ControlMenuItem (props) {
  const { onFocus, onToggle, hasChildren, isOpen, linkText, src } = props
  const isLinked = Boolean(src) && src !== '#none'

  const button = hasChildren && (
    <button
      className='menu-item-button'
      type="button"
      onFocus={onFocus}
      onClick={onToggle}
    >{isOpen ? 'Close' : 'Open'}</button>
  )

  const link = (
    <a
      className="menu-item-text"
      href={src}
      onFocus={onFocus}
    >{linkText}</a>
  )

  const span = (
    <span
      className="menu-item-text"
      tabIndex="0"
      onFocus={onFocus}
    >{linkText}</span>
  )

  const text = isLinked ? link : span

  return <span className="menu-item">{text} {button}</span>
}


function expandActivePath (aught) {
  const path = typeof aught === 'string'
    ? aught.split(PATH_SEPERATOR)
    : []

  const clean = path.map(Number)

  return clean
}
