'use strict'
import _readWpYoastOpenGraph from 'base/read/lib/_readWpYoastOpenGraph'
import _readWpYoastRobots from 'base/read/lib/_readWpYoastRobots'
import _readWpYoastTwitter from 'base/read/lib/_readWpYoastTwitter'
import cleanPlainText from 'base/clean/cleanPlainText'

export default function readWpYoastMetadata (aught) {
  const { description, title, robots } = aught || {}

  const output = {
    title: cleanPlainText(title),
    description: cleanPlainText(description),
    openGraph: _readWpYoastOpenGraph(aught),
    robots: _readWpYoastRobots(robots),
    twitter: _readWpYoastTwitter(aught),
  }

  return output
}
