import { describe, expect, it } from 'vitest'
import clean from 'base/clean/clean'

describe('clean()', () => {
  it ('Returns an empty string when param one is undefined.', () => {
    expect(clean()).to.equal('')
  })
  it ('Returns an empty string when param one is boolean false.', () => {
    expect(clean()).to.equal('')
  })
  it ('Returns an empty string when param one is boolean true.', () => {
    expect(clean()).to.equal('')
  })
  it ('Returns an empty string when param one is null.', () => {
    expect(clean(null)).to.equal('')
  })
  it ('Returns a string when param one is a number.', () => {
    expect(clean(123)).to.equal('123')
  })
})
