/**
 * Read a WordPress rendered string value.
 *
 * The WordPress REAST API v2 returns certain strings as objects with a
 * "rendered" property. This function reduces them to strings.
 *
 * @aught {Object|String} The property value to read.
 * @return {String} The string value of the property.
 */
export default function _readWpRenderedString (aught) {
  if (typeof aught === 'string') {
    return aught
  } else if (typeof aught?.rendered === 'string') {
    return aught.rendered
  } else {
    return ''
  }
}
