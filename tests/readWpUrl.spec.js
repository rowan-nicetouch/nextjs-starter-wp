import { describe, expect, it } from 'vitest'
import readWpUrl from 'base/read/readWpUrl'

describe('readWpUrl()', () => {
  it('...', () => {
    const url = readWpUrl('')

    // expect(image).to.deep.equal({
    //   alt: '',
    //   height: 0,
    //   id: 0,
    //   src: '',
    //   width: 0
    // })
  })
})
// describe('readAcfImage(object)', () => {
//   it('reads valid "alt" property.', () => {
//     const image = readAcfImage({ alt: 'This is the alt text.' })
//     expect(image.alt).to.equal('This is the alt text.')
//   })
//   it('reads valid "height" property.', () => {
//     const image = readAcfImage({ height: 213 })
//     expect(image.height).to.equal(213)
//   })
//   it('reads valid "id" property.', () => {
//     const image = readAcfImage({ id: 997 })
//     expect(image.id).to.equal(997)
//   })
//   it('maps valid "url" to "src" property.', () => {
//     const image = readAcfImage({ url: 'http://example.com/test.jpg' })
//     expect(image.src).to.equal('http://example.com/test.jpg')
//   })
//   it('reads valid "width" property.', () => {
//     const image = readAcfImage({ width: 414 })
//     expect(image.width).to.equal(414)
//   })
//   it('Does not rewrite recognized domain..', () => {
//     const url = process.env.NEXT_PUBLIC_WP_URL + '/image.jpg'
//     const image = readAcfImage({ url: url })
//     expect(image.src).to.equal(url)
//   })
// })
// describe('readAcfImage(string)', () => {
//   it('Sets only "src" property when param one is a valid URL.', () => {
//     const image = readAcfImage('http://example.com/test.jpg')
//     expect(image).to.deep.equal({
//       alt: '',
//       height: 0,
//       id: 0,
//       src: 'http://example.com/test.jpg',
//       width: 0
//     })
//   })
//   it('Sets "src" property to an empty string when param one is not a URL.', () => {
//     const image = readAcfImage('ABCDEFG')
//     expect(image.src).to.equal('')
//   })
//   it('Does not rewrite recognized domain.', () => {
//     const url = process.env.NEXT_PUBLIC_WP_URL + '/image.jpg'
//     const image = readAcfImage({ url: url })
//     console.log(image)
//     expect(image.src).to.equal(url)
//   })
// })
