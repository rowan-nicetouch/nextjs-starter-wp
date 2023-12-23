import { describe, expect, it } from 'vitest'
import { readWpDate } from 'base/read'

describe('readWpDate()', () => {
  it ('Reads non strings as empty strings.', () => {
    expect(readWpDate()).to.equal('')
    expect(readWpDate(null)).to.equal('')
    expect(readWpDate(true)).to.equal('')
    expect(readWpDate(false)).to.equal('')
    expect(readWpDate(123456)).to.equal('')
    expect(readWpDate(123.456)).to.equal('')
    expect(readWpDate([])).to.equal('')
    expect(readWpDate({})).to.equal('')
  })
  it ('Does not read invalid dates.', () => {
    expect(readWpDate('9999-99-99T99:99:99')).to.equal('')
    expect(readWpDate('2023-02-30T02:02:02')).to.equal('')
  })
  it ('Reads December 31, 1999 at 11:59:59.', () => {
    const expected = '1999-12-31T11:59:59'
    const date = readWpDate(expected)
    expect(date).to.equal(expected)
  })
  it ('Reads date from the thirteenth century.', () => {
    const expected = '1200-02-02T03:43:21'
    const date = readWpDate(expected)
    expect(date).to.equal(expected)
  })
})
