import cleanPlainText from 'base/clean/cleanPlainText'
import readWpMenuItem from 'base/read/readWpMenuItem'
/**
 * Read WordPress site data.
 *
 * WordPress does not expose this data via its built-in REST API. A custom
 * plugin must be used to fetch this data.
 *
 * @todo include link to nt plugin once launched.
 */
export default function readWpSiteData (aught) {
  const { charset, language, menus, name } = aught || {}

  const output = {
    charset: cleanPlainText(charset),
    language: cleanPlainText(language),
    name: cleanPlainText(name),
    menus: (() => {
      const output = {}
      for (const name in menus) {
        const menu = menus[name]
        output[name] = Array.isArray(menu)
          ? menu.map(item => {
            return readWpMenuItem(item)
          })
          : []
      }
      return output
    })()
  }

  return output
}
