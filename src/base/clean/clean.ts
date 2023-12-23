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
 * @param aught - The value to be sanitized.
 * @param config - {@link https://github.com/cure53/DOMPurify#can-i-configure-dompurify | DOMPurify Configuration Object}
 */
export function clean (aught:any, config?:any) : string {
  aught = typeof aught === 'number' ? String(aught) : aught
  aught = typeof aught === 'string' ? aught : ''

  // https://github.com/cure53/DOMPurify?tab=readme-ov-file#influence-the-return-type
  if (config?.RETURN_DOM === true) {
    throw new Error('Use of the RETURN_DOM option is not supported.')
  }
  if (config?.RETURN_DOM_FRAGMENT === true) {
    throw new Error('Use of the RETURN_DOM_FRAGMENT option is not supported.')
  }
  if (config?.RETURN_TRUSTED_TYPE === true) {
    throw new Error('Use of the RETURN_TRUSTED_TYPE option is not supported.')
  }
  if (config?.TRUSTED_TYPES_POLICY) {
    throw new Error('Use of the TRUSTED_TYPES_POLICY option is not supported.')
  }

  const jsDomWindow = new JSDOM("<!DOCTYPE html>").window
  const sanitized = DOMPurify(jsDomWindow).sanitize(aught, config)
  return String(sanitized)
}
