import { describe, expect, it } from 'vitest'
import { readWpSiteData } from 'base/read'

describe('readWpSiteData()', () => {
  it('Property "charset" is an empty string when param one is undefined.', () => {
    expect(readWpSiteData().charset).to.equal('')
  })
  it('Property "language" is an empty string when param one is undefined.', () => {
    expect(readWpSiteData().language).to.equal('')
  })
  it('Property "name" is an empty string when param one is undefined.', () => {
    expect(readWpSiteData().name).to.equal('')
  })
  it('Property "menus" is an empty object when param one is undefined.', () => {
    expect(readWpSiteData().menus ).to.deep.equal({})
  })

})
