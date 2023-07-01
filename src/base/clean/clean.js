'use strict'

import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

/**
 * General wrapper function for DOMPurify.sanitize().
 *
 * This function should generally not be used in component files. It is
 * included here for use in library files which require specific rules not
 * represented in the base cleaners.
 *
 * Safe for use in both client and server components.
 *
 * @param {Mixed} aught - The value to be sanitized.
 * @param {Object} config - configuration options for DOMPurify.sanitize()
 *   See: https://github.com/cure53/DOMPurify#can-i-configure-dompurify
 *
 * @return {String} - A string with safer HTML ready to be translated into JSX.
 */
export default function clean (aught, config) {
  aught = typeof aught === 'number' ? String(aught) : aught
  aught = typeof aught === 'string' ? aught : ''
  const jsDomWindow = new JSDOM("<!DOCTYPE html>").window
  const sanitized = DOMPurify(jsDomWindow).sanitize(aught, config)
  return sanitized
}
