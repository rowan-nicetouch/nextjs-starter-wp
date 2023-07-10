'use client'

import { useEffect, useRef, useState } from 'react'

const BASE_PATH = '0'
const PATH_SEPERATOR = '/'

/**
 * WordPress Menu Component.
 *
 * @param {Object} props
 * @param {Object} props.menuItems A plain javascript object representing a
 *   tree of nested menus.
 * @param {String} props.label Required. A human-readable name for the menu.
 *   This value will be used to identify this menu in assistive tech.
 *
 * @throws {Error} when `props.label` is not a non-empty string.
 */
export default function WpMenu (props) {
  const { menuItems, menuLabel, ...atts } = props
  const [ activePath, setActivePath ] = useState(BASE_PATH)
  const [ focusPath, setFocusPath ] = useState('')
  const menuRef = useRef()
  const depth = 0

  // Label prop is required.
  if (typeof menuLabel !== 'string' || menuLabel === '') {
    throw new Error('The menuLabel prop must be a non-empty string.')
  }

  // Close all submenus when the main menu is tabbed out of.
  useEffect(() => {
    const test = (event) => {
      const isMenuFocused = typeof menuRef?.current?.contains === 'function'
        ? menuRef?.current?.contains(event.target)
        : false

      if (!isMenuFocused) {
        setActivePath(BASE_PATH)
      }
    }
    window.addEventListener('focusin', test)
    return () => window.removeEventListener('focusin', test)
  }, [])

  // Close an individual submenu when it is tabbed out of.
  useEffect(() => {
    const active = expandPath(activePath)
    const focus = expandPath(focusPath)
    if (active[1] !== focus[1]) {
      setActivePath(BASE_PATH)
    } else if (activePath === focusPath) {
      setActivePath(active.slice(0, -1).join(PATH_SEPERATOR))
    }
  }, [focusPath])

  return (
    <nav ref={menuRef} data-menu aria-label={menuLabel}>
      <ul {...atts} data-menu-depth={depth}>
        {
          menuItems.map(item => {
            return <WpMenuItem
              activePath={activePath}
              key={item?.id}
              setFocusPath={setFocusPath}
              setActivePath={setActivePath}
              parentPath={BASE_PATH}
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
    setFocusPath,
    setActivePath,
    id,
    linkText,
    parentDepth,
    parentPath,
    src
  } = props

  const depth = parentDepth + 1
  const handleItemFocus = () => setFocusPath(path)
  const hasChildren = children?.length > 0
  const isOpen = expandPath(activePath).includes(id)
  const path = parentPath + PATH_SEPERATOR + id

  return (
    <li>
      <span className="menu-item">
        <ItemText
          onFocus={handleItemFocus}
          linkText={linkText}
          src={src}
        />
        {hasChildren && (<Button
          isOpen={isOpen}
          onClose={() => { setActivePath(parentPath) }}
          onFocus={handleItemFocus}
          onOpen={() => { setActivePath(path) }}
        />)}
      </span>

      {hasChildren && (
        <ul
          className="submenu"
          data-menu-depth={depth}
          data-menu-is-open={isOpen}
        >
          {children.map(item => {
            return <WpMenuItem
              activePath={activePath}
              key={item.id}
              setFocusPath={setFocusPath}
              setActivePath={setActivePath}
              parentDepth={depth}
              parentPath={path}
              {...item}
            />
          })}
        </ul>
      )}
    </li>
  )
}

function Button (props) {
  const { isOpen, onClose, onFocus, onOpen } = props

  const open = (
    <button
      className='menu-item-button-open'
      type="button"
      onFocus={onFocus}
      onClick={onOpen}
    >Open</button>
  )

  const close = (
    <button
      className='menu-item-button-close'
      type="button"
      onFocus={onFocus}
      onClick={onClose}
    >Close</button>
  )

  return isOpen ? close : open
}

function ItemText (props) {
  const { onFocus, linkText, src } = props
  const isLinked = Boolean(src) && src !== '#none'

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

  return isLinked ? link : span
}

function expandPath (aught) {
  const path = typeof aught === 'string'
    ? aught.split(PATH_SEPERATOR)
    : []

  const clean = path.map(Number)

  return clean
}
