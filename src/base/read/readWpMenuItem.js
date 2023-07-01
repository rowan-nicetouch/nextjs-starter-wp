import ClassList from 'base/ClassList'
import cleanLinkText from 'base/clean/cleanLinkText'
import cleanText from 'base/clean/cleanText'
import cleanUrl from 'base/clean/cleanUrl'
import cleanWholeNumber from 'base/clean/cleanWholeNumber'

/**
 * Read WordPress menu item.
 *
 * Only the following properties returned by WordPress are recognized by
 * this function:
 *
 *   - attr_title
 *   - classes
 *   - description
 *   - ID
 *   - menu_item_parent
 *   - menu_order
 *   - target
 *   - title
 *   - url
 */
export default function readWpMenuItem (aught) {
  if (!aught) {
    return {}
  }

  const cleanedId = cleanWholeNumber(aught?.ID)
  const cleanedUrl = cleanUrl(aught?.url)
  const cleanedTitle = cleanLinkText(aught?.title)

  // Required properties
  if (!cleanedId || !cleanedUrl || !cleanedTitle) {
    return {}
  }

  const classes = Array.isArray(aught?.classes)
    ? new ClassList(...aught.classes)
    : new ClassList(aught?.classes)

  const output = {
    id: cleanedId,
    src: cleanedUrl,
    linkText: cleanedTitle,
    parentId: cleanWholeNumber(aught?.menu_item_parent),
    position: cleanWholeNumber(aught?.menu_order),
    target: cleanText(aught?.target),
    title: cleanText(aught?.attr_title),
    description: cleanText(aught?.description),
    classes: classes.toString()
  }

  return output
}