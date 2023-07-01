'use strict'

const DEFAULT = 0

/**
 * Clean whole number.
 *
 * @return {Number} A positive integer or zero.
 */
export default function cleanWholeNumber (aught) {
  try {
    aught = typeof aught === 'boolean' ? 0 : aught
    const number = Number(aught)
    return Number.isInteger(number) && number > -1 ? number : DEFAULT
  } catch (error) {
    return DEFAULT
  }
}
