import { describe, expect, it } from 'vitest'
import readWpPost from 'base/read/readWpPost'

const DATA_URL = process.env.NEXT_PUBLIC_WP_URL
const NEXT_URL = process.env.NEXT_PUBLIC_URL

describe('readWpPost().categories', () => {
  it ('Defaults to an empty array.', () => {
    const post = readWpPost()
    expect(Array.isArray(post.categories)).to.equal(true)
    expect(post.categories.length).to.equal(0)
  })
  it ('Reads one embedded category.', () => {
    const post = readWpPost({
      _embedded: {
        'wp:term': [
          [
            {
              id: 16,
              link: DATA_URL + '/category/two/',
              name: 'Two',
              slug: 'two',
              taxonomy: 'category',
            }
          ]
        ]
      }
    })
    expect(Array.isArray(post.categories)).to.equal(true)
    expect(post.categories.length).to.equal(1)
    expect(post.categories[0].acf).to.deep.equal({})
    expect(post.categories[0].id).to.equal(16)
    expect(post.categories[0].link).to.equal(NEXT_URL + '/category/two/')
    expect(post.categories[0].name).to.equal('Two')
    expect(post.categories[0].slug).to.equal('two')
    expect(post.categories[0].taxonomy).to.equal('category')
  })
})
describe('readWpPost().content', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().content).to.equal('')
  })
  it ('Reads from content.', () => {
    const post = readWpPost({ content: 'I am the string content' })
    expect(post.content).to.equal('I am the string content')
  })
  it ('Reads from content.rendered.', () => {
    const post = readWpPost({ content: { rendered: 'I am the rendered content' } })
    expect(post.content).to.equal('I am the rendered content')
  })
})
describe('readWpPost().excerpt', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().excerpt).to.equal('')
  })
  it ('Reads from excerpt.', () => {
    const post = readWpPost({ excerpt: 'I am the string excerpt' })
    expect(post.excerpt).to.equal('I am the string excerpt')
  })
  it ('Reads from excerpt.rendered.', () => {
    const post = readWpPost({ excerpt: { rendered: 'I am the rendered excerpt' } })
    expect(post.excerpt).to.equal('I am the rendered excerpt')
  })
})
describe('readWpPost().dateModified', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().dateModified).to.equal('')
  })
  it ('Returns an empty string when parameter is not a date.', () => {
    expect(readWpPost({ modified: 'ABCDEFG' }).dateModified).to.equal('')
  })
  it ('Returns Christmas 1999 a little past a half past Noon.', () => {
    const post = readWpPost({ modified: '1999-12-25T12:34:56' })
    expect(post.dateModified).to.equal('1999-12-25T12:34:56')
  })
})
describe('readWpPost().dateModifiedUtc', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().dateModifiedUtc).to.equal('')
  })
  it ('Returns an empty string when parameter is not a date.', () => {
    expect(readWpPost({ modified_gmt: 'ABCDEFG' }).dateModifiedUtc).to.equal('')
  })
  it ('Returns Christmas 1999 a little past a half past Noon.', () => {
    const post = readWpPost({ modified_gmt: '1999-12-25T12:34:56' })
    expect(post.dateModifiedUtc).to.equal('1999-12-25T12:34:56')
  })
})
describe('readWpPost().datePublished', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().datePublished).to.equal('')
  })
  it ('Returns an empty string when parameter is not a date.', () => {
    expect(readWpPost({ date: 'ABCDEFG' }).datePublished).to.equal('')
  })
  it ('Returns Christmas 1999 a little past a half past Noon.', () => {
    const post = readWpPost({ date: '1999-12-25T12:34:56' })
    expect(post.datePublished).to.equal('1999-12-25T12:34:56')
  })
})
describe('readWpPost().datePublishedUtc', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().datePublishedUtc).to.equal('')
  })
  it ('Returns an empty string when parameter is not a date.', () => {
    expect(readWpPost({ date_gmt: 'ABCDEFG' }).datePublishedUtc).to.equal('')
  })
  it ('Returns Christmas 1999 a little past a half past Noon.', () => {
    const post = readWpPost({ date_gmt: '1999-12-25T12:34:56' })
    expect(post.datePublishedUtc).to.equal('1999-12-25T12:34:56')
  })
})
describe('readWpPost().id', () => {
  it ('Returns zero when no parameter is given.', () => {
    expect(readWpPost().id).to.equal(0)
  })
  it ('Reads from positive integer.', () => {
    const post = readWpPost({ id: 234 })
    expect(post.id).to.equal(234)
  })
  it ('Reads from positive integer string.', () => {
    const post = readWpPost({ id: '123' })
    expect(post.id).to.equal(123)
  })
})
describe('readWpPost().tags', () => {
  it ('Defaults to an empty array.', () => {
    const post = readWpPost()
    expect(Array.isArray(post.tags)).to.equal(true)
    expect(post.tags.length).to.equal(0)
  })
  it ('Reads one embedded tag.', () => {
    const post = readWpPost({
      _embedded: {
        'wp:term': [
          [
            {
              id: 3224,
              link: DATA_URL + '/tag/three/',
              name: 'Three',
              slug: 'three',
              taxonomy: 'post_tag',
            }
          ]
        ]
      }
    })
    expect(Array.isArray(post.tags)).to.equal(true)
    expect(post.tags.length).to.equal(1)
    expect(post.tags[0].acf).to.deep.equal({})
    expect(post.tags[0].id).to.equal(3224)
    expect(post.tags[0].link).to.equal(NEXT_URL + '/tag/three/')
    expect(post.tags[0].name).to.equal('Three')
    expect(post.tags[0].slug).to.equal('three')
    expect(post.tags[0].taxonomy).to.equal('post_tag')
  })
})
describe('readWpPost().title', () => {
  it ('Returns an empty string when no parameter is given.', () => {
    expect(readWpPost().title).to.equal('')
  })
  it ('Reads from title.', () => {
    const post = readWpPost({ title: 'I am the string title' })
    expect(post.title).to.equal('I am the string title')
  })
  it ('Reads from title.rendered.', () => {
    const post = readWpPost({ title: { rendered: 'I am the rendered title' } })
    expect(post.title).to.equal('I am the rendered title')
  })
})





describe('readWpPost().link', () => {
  it ('Defaults to an empty string.', () => {
    expect(readWpPost().link).to.equal('')
  })
  it('replaces recognized domains in src.', () => {
    const path = '/segments/1/2/3'
    const dataUrl = process.env.NEXT_PUBLIC_WP_URL + path
    const nextUrl = process.env.NEXT_PUBLIC_URL + path
    const post = readWpPost({ link: dataUrl })
    expect(post.link).to.equal(nextUrl)
  })
})
