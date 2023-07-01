'use strict'

import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

export default function clean (aught, config) {
  aught = typeof aught === 'string' ? aught : ''
  const jsDomWindow = new JSDOM("<!DOCTYPE html>").window
  const sanitized = DOMPurify(jsDomWindow).sanitize(aught, config)
  return sanitized
}
