'use strict'
import _readWpYoastOpenGraph from 'base/read/_readWpYoastOpenGraph'
import _readWpYoastRobots from 'base/read/_readWpYoastRobots'
import _readWpYoastTwitter from 'base/read/_readWpYoastTwitter'
import cleanText from 'base/clean/cleanText'

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
