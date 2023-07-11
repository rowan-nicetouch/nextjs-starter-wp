'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import Item from 'base/components/WpMenu/Item'
import expandPath from 'base/components/WpMenu/expandPath'
import makePath from 'base/components/WpMenu/makePath'

const BASE_PATH = '0'

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
  const currentPath = usePathname()
  const menuRef = useRef()
  const depth = 0

  // Label prop is required.
  if (typeof menuLabel !== 'string' || menuLabel === '') {
    throw new Error('The menuLabel prop must be a non-empty string.')
  }

  // Close all submenus when the main menu is tabbed or clicked out of.
  useEffect(() => {
    const test = (event) => {
      const isTargetInMenu = typeof menuRef?.current?.contains === 'function'
        ? menuRef?.current?.contains(event.target)
        : false

      if (!isTargetInMenu) {
        setActivePath(BASE_PATH)
      }
    }
    window.addEventListener('click', test)
    window.addEventListener('focusin', test)
    return () => {
      window.removeEventListener('click', test)
      window.removeEventListener('focusin', test)
    }
  }, [])

  // Close a submenu when it is tabbed out of.
  useEffect(() => {
    const active = expandPath(activePath)
    const focus = expandPath(focusPath)
    if (active[1] !== focus[1]) {
      setActivePath(BASE_PATH)
    } else if (activePath === focusPath) {
      setActivePath(makePath(active.slice(0, -1)))
    }
  }, [focusPath])

  return (
    <nav ref={menuRef} data-menu aria-label={menuLabel}>
      <ul {...atts} data-menu-depth={depth}>
        {
          menuItems.map(item => {
            return <Item
              activePath={activePath}
              currentPath={currentPath}
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
