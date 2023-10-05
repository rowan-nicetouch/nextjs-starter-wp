/**
 * This spec relies on thfollowing values set in .env.test:
 *
 *   - NEXT_PUBLIC_URL=https://example.com/js
 *   - NEXT_PUBLIC_WP_URL=https://example.com/wp
 *
 */
import { expect, test } from 'vitest'
import readWpUrl from 'base/read/readWpUrl'


test.each([
  ['', ''],
  ['https://example.com', 'https://example.com'],
  ['https://example.com/wp', 'https://example.com/js'],
  ['https://example.com/wp/', 'https://example.com/js/'],
  ['https://example.com/wp/one/two/three', 'https://example.com/js/one/two/three'],
  ['https://example.com/wp/?monters=cute', 'https://example.com/js/?monters=cute'],
  ['https://example.com/wp/?monters=cute&kittens=cute', 'https://example.com/js/?monters=cute&kittens=cute'],
  ['https://example.com/wp/#cupcakes', 'https://example.com/js/#cupcakes'],
])('readWpUrl("%s") = "%s"', (a, expected) => {
  expect(readWpUrl(a)).toStrictEqual(expected)
})
