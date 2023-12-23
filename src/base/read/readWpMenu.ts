import { readWpMenuItem } from 'base/read'

import { WpMenuItem } from 'base/types'

/**
 * Read menu.
 *
 * Translates the flat menu returned by the WordPress REST API v2 into a tree.
 */
export function readWpMenu (aught:any) : Array<WpMenuItem> {
  aught = Array.isArray(aught) ? aught : []

  aught = aught.map((item:any) => {
    return readWpMenuItem(item)
  })

  // Sort
  const sorted = [...aught].sort((a, b) => {
    if (a.parentId < b.parentId || a.position < b.position) {
      return -1
    }
    if (a.parentId > b.parentId || a.position > b.position) {
      return 1
    }
    return 0
  })

  const tree = []

  while (sorted.length > 0) {
    const item = sorted.pop()
    if (item.parentId === 0) {
      tree.unshift(item)
    } else {
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].id === item.parentId) {
          sorted[i].children.unshift(item)
        }
      }
    }
  }

  return tree
}
