import { describe, expect, it } from 'vitest'
import readWpMenuItem from 'base/read/readWpMenuItem'

const REQUIRED_PROPS = {
  ID: 123,
  url: 'https://example.com',
  title: 'Example Link'
}

const DEFAULT_ITEM = {
  id: 0,
  src: '',
  linkText: '',
  parentId: 0,
  position: 0,
  target: '',
  title: '',
  description: '',
  classes: '',
  children: []
}

describe('readWpMenuItem()', () => {
  it('returns an empty object when no params are given.', () => {
    const item = readWpMenuItem()
    expect(item).to.deep.equal({})
  })
  it('returns an empty object when ID is zero.', () => {
    const item = readWpMenuItem({ ...REQUIRED_PROPS, ID: 0 })
    expect(item).to.deep.equal({})
  })
  it('returns an object when required properties exist.', () => {
    const item = readWpMenuItem(REQUIRED_PROPS)
    const expected = {
      ...DEFAULT_ITEM,
      id: 123,
      src: 'https://example.com',
      linkText: 'Example Link',
    }
    expect(item).to.deep.equal(expected)
  })
  it('converts classes to a string.', () => {
    const item = readWpMenuItem({
      ...REQUIRED_PROPS,
      classes: ['banana', 'gremlin', 'monster']
    })
    expect(item.classes).to.equal('banana gremlin monster')
  })
  it('removes duplicate classes.', () => {
    const item = readWpMenuItem({
      ...REQUIRED_PROPS,
      classes: ['banana', 'banana', 'banana', 'banana']
    })
    expect(item.classes).to.equal('banana')
  })
})
