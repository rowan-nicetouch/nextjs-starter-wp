'use strict'
import _readWpYoastOpenGraph from './_readWpYoastOpenGraph'
import _readWpYoastRobots from './_readWpYoastRobots'
import _readWpYoastTwitter from './_readWpYoastTwitter'

import { cleanText } from 'base/clean'

export default function readWpYoastMetadata (aught) {
  const { description, title, robots } = aught || {}

  const output = {
    title: cleanText(title),
    description: cleanText(description),
    openGraph: _readWpYoastOpenGraph(aught),
    robots: _readWpYoastRobots(robots),
    twitter: _readWpYoastTwitter(aught),
  }

  return output
}
