/**
 * Read a WordPress rendered string value.
 *
 * The WordPress REAST API v2 returns certain strings as objects with a
 * "rendered" property. This function reduces them to strings.
 *
 * Post/Page
 *   - content
 *   - excerpt
 *   - guid
 *   - title
 *
 *
 * @aught {Object|String} The property value to read.
 */
export function readWpRenderedString (aught:any) : string {
  if (typeof aught === 'string') {
    return aught
  } else if (typeof aught?.rendered === 'string') {
    return aught.rendered
  } else {
    return ''
  }
}
