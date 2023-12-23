import { describe, expect, it } from 'vitest'
import { cleanWholeNumber } from 'base/clean'

describe('cleanWholeNumber()', () => {

/* ========================================================================= */
/* = Zero Values                                                           = */
/* ========================================================================= */

  it ('Returns zero when param one is undefined.', () => {
    expect(cleanWholeNumber()).to.equal(0)
  })
  it ('Returns zero when param one is null.', () => {
    expect(cleanWholeNumber(null)).to.equal(0)
  })
  it ('Returns zero when param one is boolean false.', () => {
    expect(cleanWholeNumber(false)).to.equal(0)
  })
  it ('Returns zero when param one is boolean true.', () => {
    expect(cleanWholeNumber(true)).to.equal(0)
  })
  it ('Returns zero when param one is an array.', () => {
    expect(cleanWholeNumber([])).to.equal(0)
  })
  it ('Returns zero when param one is plain object.', () => {
    expect(cleanWholeNumber({})).to.equal(0)
  })
  it ('Returns zero when param one is zero integer.', () => {
    expect(cleanWholeNumber(0)).to.equal(0)
  })
  it ('Returns zero when param one is negative integer.', () => {
    expect(cleanWholeNumber(-1)).to.equal(0)
    expect(cleanWholeNumber(-3232)).to.equal(0)
  })
  it ('Returns zero when param one is positive float.', () => {
    expect(cleanWholeNumber(1.23)).to.equal(0)
  })
  it ('Returns zero when param one is negative float.', () => {
    expect(cleanWholeNumber(1.23)).to.equal(0)
  })
  it ('Returns zero when param one is a string of three integers seperated by whitespace.', () => {
    expect(cleanWholeNumber('1 2 3')).to.equal(0)
  })

/* ========================================================================= */
/* = Whole Number Values                                                   = */
/* ========================================================================= */

  it ('Returns correct value when param one is positive integer.', () => {
    expect(cleanWholeNumber(1)).to.equal(1)
    expect(cleanWholeNumber(2343)).to.equal(2343)
    expect(cleanWholeNumber(99999)).to.equal(99999)
  })
  it ('Returns correct value when param one is a string containing a positive integer.', () => {
    expect(cleanWholeNumber('1')).to.equal(1)
    expect(cleanWholeNumber('2343')).to.equal(2343)
    expect(cleanWholeNumber('99999')).to.equal(99999)
  })
  it ('Returns correct value when param one is a string representing an integer with spaces on the left.', () => {
    expect(cleanWholeNumber(' 123')).to.equal(123)
    expect(cleanWholeNumber('  123')).to.equal(123)
    expect(cleanWholeNumber('   123')).to.equal(123)
  })
  it ('Returns correct value when param one is a string representing an integer with spaces on the right.', () => {
    expect(cleanWholeNumber('123 ')).to.equal(123)
    expect(cleanWholeNumber('123  ')).to.equal(123)
    expect(cleanWholeNumber('123   ')).to.equal(123)
  })
  it ('Returns correct value when param one is a string representing an integer with spaces on both sides.', () => {
    expect(cleanWholeNumber(' 123 ')).to.equal(123)
    expect(cleanWholeNumber('  123  ')).to.equal(123)
    expect(cleanWholeNumber('   123   ')).to.equal(123)
  })
})
