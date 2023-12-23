import { describe, expect, it } from 'vitest'
import { readYoastSeo } from 'base/read'

describe('readYoastSeo().title', () => {
  it('is empty string when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.title).to.equal('')
  })
  it('chooses Yoast title when it is the only option.', () => {
    const meta = readYoastSeo({ yoast_head_json: { title: 'Yoast Title' } })
    expect(meta.title).to.equal('Yoast Title')
  })
  it('chooses Yoast title when all other options are present.', () => {
    const meta = readYoastSeo(
      {
        title: { rendered: 'Post Title' },
        yoast_head_json: { title: 'Yoast Title' }
      },
      {
        title: 'Fallback Title' }
      )
    expect(meta.title).to.equal('Yoast Title')
  })
})
describe('readYoastSeo().description', () => {
  it('is an empty string when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.description).to.equal('')
  })
  it('reads from Yoast value when set.', () => {
    const meta = readYoastSeo({
      yoast_head_json: {
        description: 'Yoast Description'
      }
    })
    expect(meta.description).to.equal('Yoast Description')
  })
  it('does not read from fallback value.', () => {
    const meta = readYoastSeo({}, {
      description: 'Fallback Description'
    })
    expect(meta.description).to.equal('')
  })
})
describe('readYoastSeo().openGraph', () => {
  it('is null when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.openGraph).to.equal(null)
  })
  it('is null when title is missing.', () => {
    const meta = readYoastSeo({
      yoast_head_json: {
        og_url: 'https://example.com',
        og_description: 'Yoast Description',
        og_site_name: 'Yoast Site Name',
        og_image: [],
        og_locale: 'Yoast Locale',
        og_type: 'Yoast Type',
      }
    })
    expect(meta.openGraph).to.equal(null)
  })
  it('is null when url is missing.', () => {
    const meta = readYoastSeo({
      yoast_head_json: {
        og_title: 'Yoast OG Title',
        og_description: 'Yoast OG Description',
        og_site_name: 'Yoast OG Site Name',
        og_image: [],
        og_locale: 'Yoast OG Locale',
        og_type: 'Yoast OG Type',
      }
    })
    expect(meta.openGraph).to.equal(null)
  })
  it('is valid object when title and url exist.', () => {
    const meta = readYoastSeo({
      yoast_head_json: {
        og_title: 'Yoast OG Title',
        og_url: 'https://example.com',
        og_description: 'Yoast OG Description',
        og_site_name: 'Yoast OG Site Name',
        og_image: [
          'https://example.com/test-1.jpg',
          'https://example.com/test-2.jpg',
          'https://example.com/test-3.jpg'
        ],
        og_locale: 'Yoast OG Locale',
        og_type: 'Yoast OG Type',
      }
    })

    expect(meta.openGraph.title).to.equal('Yoast OG Title')
    expect(meta.openGraph.url).to.equal('https://example.com')
    expect(meta.openGraph.description).to.equal('Yoast OG Description')
    expect(meta.openGraph.images).to.deep.equal([
      'https://example.com/test-1.jpg',
      'https://example.com/test-2.jpg',
      'https://example.com/test-3.jpg'
    ])
    expect(meta.openGraph.siteName).to.equal('Yoast OG Site Name')
    expect(meta.openGraph.locale).to.equal('Yoast OG Locale')
    expect(meta.openGraph.type).to.equal('Yoast OG Type')
  })
  it('replaces recognized domains in url.', () => {
    const path = '/segments/1/2/3'
    const wpUrl = process.env.NEXT_PUBLIC_WP_URL + path
    const nextUrl = process.env.NEXT_PUBLIC_URL + path

    const meta = readYoastSeo({
      yoast_head_json: {
        og_title: 'Yoast OG Title',
        og_url: wpUrl
      }
    })

    expect(meta.openGraph.url).to.equal(nextUrl)
  })
})
describe('readYoastSeo().robots', () => {
  it('follow prop is null when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.robots.follow).to.equal(null)
  })
  it('index prop is null when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.robots.index).to.equal(null)
  })
  it('nocache prop is false when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.robots.nocache).to.equal(false)
  })
  it('noimageindex prop false when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.robots.noimageindex).to.equal(false)
  })
  it('googlebot.index prop is null when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.robots.googleBot.index).to.equal(null)
  })
  it('googleBot.follow prop is null when zero parameters are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.robots.googleBot.follow).to.equal(null)
  })
})

describe('readYoastSeo().twitter', () => {
  it('is null when no values are provided.', () => {
    const meta = readYoastSeo()
    expect(meta.twitter).to.equal(null)
  })
  it('is reads title correctly.', () => {
    const meta = readYoastSeo({
      yoast_head_json: {
        twitter_card: 'Yoast Twitter Card',
        twitter_title: 'Yoast Twitter Title',
        twitter_description: 'Yoast Twitter Description',
        twitter_image: 'https://example.com/yoast-twitter-image.jpg',
        twitter_site: 'Yoast Twitter Site'
      }
    })
    expect(meta.twitter.card).to.equal('Yoast Twitter Card')
    expect(meta.twitter.title).to.equal('Yoast Twitter Title')
    expect(meta.twitter.description).to.equal('Yoast Twitter Description')
    expect(meta.twitter.images).to.deep.equal([
      'https://example.com/yoast-twitter-image.jpg'
    ])
    expect(meta.twitter.creator).to.equal('Yoast Twitter Site')

  })
})
