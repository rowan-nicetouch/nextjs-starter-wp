import cleanPlainText from 'base/clean/cleanPlainText'
import cleanUrl from 'base/clean/cleanUrl'

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


  const cleanCard = cleanPlainText(twitter_card)
  const cleanTitle = cleanPlainText(twitter_title)
  const cleanDescription = cleanPlainText(twitter_description)
  const cleanImage = cleanUrl(twitter_image)
  const cleanCreator = cleanPlainText(twitter_site)

  const values = [cleanCard, cleanTitle, cleanDescription, cleanImage, cleanCreator]

  if (values.filter(Boolean).length === 0) {
    return null
  }

  const output = {
    card: cleanCard,
    title: cleanTitle,
    description: cleanDescription,
    images: [ cleanImage ],
    creator: cleanCreator,
  }

  return output
}