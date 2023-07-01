'use strict'
import _readWpYoastOpenGraph from 'base/read/_readWpYoastOpenGraph'
import _readWpYoastRobots from 'base/read/_readWpYoastRobots'
import _readWpYoastTwitter from 'base/read/_readWpYoastTwitter'
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
