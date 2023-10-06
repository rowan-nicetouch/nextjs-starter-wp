import ClassList from 'base/ClassList'
import cleanLinkText from 'base/clean/cleanLinkText'
import cleanPlainText from 'base/clean/cleanPlainText'
import cleanWholeNumber from 'base/clean/cleanWholeNumber'
import readUrl from 'base/read/readUrl'

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
  const cleanedUrl = ((url) => {
    url = typeof url === 'string' ? url : ''

    if (url === '#none') {
      return url
    }

    if (url.indexOf('/') === 0) {
      url = process.env.NEXT_PUBLIC_URL + url
    }

    return readUrl(url)
  })(aught?.url)
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
    target: cleanPlainText(aught?.target),
    title: cleanPlainText(aught?.attr_title),
    description: cleanPlainText(aught?.description),
    classes: classes.toString(),
    children: []
  }

  return output
}
