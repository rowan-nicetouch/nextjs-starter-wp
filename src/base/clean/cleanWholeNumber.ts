'use strict'

const DEFAULT = 0

/**
 * Clean whole number.
 *
 * Returns a positive integer or zero.
 */
export function cleanWholeNumber (aught:any) : number {
  try {
    aught = typeof aught === 'boolean' ? 0 : aught
    const number = Number(aught)
    return Number.isInteger(number) && number > -1 ? number : DEFAULT
  } catch (error) {
    return DEFAULT
  }
}
