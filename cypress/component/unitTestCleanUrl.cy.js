import cleanUrl from 'base/clean/cleanUrl'

describe('cleanUrl', () => {
  it('returns empty string when param one is undefined.', () => {
    expect(cleanUrl()).to.equal('')
  })
  it('returns empty string for integer.', () => {
    expect(cleanUrl(1234)).to.equal('')
  })
  it('returns empty string for array.', () => {
    expect(cleanUrl([])).to.equal('')
  })
  it('returns empty string for plain object.', () => {
    expect(cleanUrl({})).to.equal('')
  })
  it('returns empty string for false.', () => {
    expect(cleanUrl(false)).to.equal('')
  })
  it('returns empty string for true.', () => {
    expect(cleanUrl(true)).to.equal('')
  })
  it('returns empty string for non-url string.', () => {
    expect(cleanUrl('ABCDEF')).to.equal('')
  })
  it('returns domain with trailing slash.', () => {
    const url = 'https://example.com/'
    expect(cleanUrl(url)).to.equal(url)
  })
  it('returns domain without trailing slash.', () => {
    const url = 'https://example.com'
    expect(cleanUrl(url)).to.equal(url)
  })
  it('returns domain with path having trailing slash.', () => {
    const url = 'https://example.com/one/two/'
    expect(cleanUrl(url)).to.equal(url)
  })
  it('returns domain with path without trailing slash.', () => {
    const url = 'https://example.com/one/two'
    expect(cleanUrl(url)).to.equal(url)
  })
})
