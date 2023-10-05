import { describe, expect, it } from 'vitest'
import readAcfLink from 'base/read/readAcfLink'

describe('readAcfLink()', () => {
  it('Sets all properties to empty strings when param one is undefined.', () => {
    const link = readAcfLink()
    expect(link).to.deep.equal({
      target: '',
      text: '',
      src: '',
    })
  })
  it('maps valid "target" to "target".', () => {
    const link = readAcfLink({ target: '_blank' })
    console.log('link',link)
    expect(link.target).to.equal('_blank')
  })
  it('maps valid "title" to "text".', () => {
    const link = readAcfLink({ title: 'ABCDEF' })
    expect(link.text).to.equal('ABCDEF')
  })
  it('maps valid "url" to "src".', () => {
    const link = readAcfLink({ url: 'https://example.com' })
    expect(link.src).to.equal('https://example.com')
  })
  it('replaces recognized domains in src.', () => {
    const path = '/segments/1/2/3'
    const dataUrl = process.env.NEXT_PUBLIC_WP_URL + path
    const nextUrl = process.env.NEXT_PUBLIC_URL + path
    const link = readAcfLink({ url: dataUrl })
    expect(link.src).to.equal(nextUrl)
  })
  it('removes anchors that appear in "text".', () => {
    const link = readAcfLink({ title: '<a href="example.com">Click Here</a>' })
    expect(link.text).to.equal('Click Here')
  })
})
