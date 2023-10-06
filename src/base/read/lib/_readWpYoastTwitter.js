import cleanPlainText from 'base/clean/cleanPlainText'
import readUrl from 'base/read/readUrl'

/**
 * Read Yoast Twitter Data.
 *
 * Translates twitter metadata from the Yoast SEO format into a format usable
 * by Nextjs's metadata API.
 */
export default function readWpYoastTwitter (aught) {
  const {
    twitter_card,
    twitter_title,
    twitter_description,
    twitter_image,
    twitter_site
  } = aught || {}


  const card = cleanPlainText(twitter_card)
  const title = cleanPlainText(twitter_title)
  const description = cleanPlainText(twitter_description)
  const image = readUrl(twitter_image)
  const creator = cleanPlainText(twitter_site)

  const values = [card, title, description, image, creator]
  if (values.filter(Boolean).length === 0) {
    return null
  }

  const output = {
    card,
    creator,
    description,
    title,
    images: [ image ],
  }

  return output
}
