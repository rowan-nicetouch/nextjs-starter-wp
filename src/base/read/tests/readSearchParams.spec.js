/**
 * This spec relies on thfollowing values set in .env.test:
 *
 *   - NEXT_PUBLIC_URL=https://example.com/js
 *   - NEXT_PUBLIC_WP_URL=https://example.com/wp
 */
import { describe, expect, it } from 'vitest'
import { readSearchParams } from 'base/read'

describe('readAcfLink()', () => {
  it('Reads undefined as empty string.', () => {
    const read = readSearchParams().toString()
    expect(read).to.deep.equal('')
  })
  it('Reads number values', () => {
    const raw = { test: 123 }
    const read = readSearchParams(raw).toString()
    expect(read).to.deep.equal('test=123')
  })
  it('Reads string values', () => {
    const raw = { letters: 'ABC' }
    const read = readSearchParams(raw).toString()
    expect(read).to.deep.equal('letters=ABC')
  })
  it('Reads array of strings.', () => {
    const raw = { letters: ['A', 'B', 'C'] }
    const read = readSearchParams(raw).toString()
    expect(read).to.deep.equal('letters=A%2CB%2CC')
  })
  it('Reads array of whole numbers.', () => {
    const raw = { letters: [0, 1, 23, 456] }
    const read = readSearchParams(raw).toString()
    expect(read).to.deep.equal('letters=0%2C1%2C23%2C456')
  })

  it('Reads boolean true as 1.', () => {
    const raw = { booleanTrue: true }
    const read = readSearchParams(raw).toString()
    expect(read).to.deep.equal('booleanTrue=1')
  })
})
