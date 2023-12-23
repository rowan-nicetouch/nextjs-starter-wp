'use strict'

import { cleanWholeNumber } from 'base/clean'

export function cleanPositiveIntegerArray (aught:any) : Array<number> {
  aught = Array.isArray(aught) ? aught : []
  const wholeNumbers = aught.map((n:any) => cleanWholeNumber(n))
  const positiveIntegers = wholeNumbers.filter(Boolean)
  return positiveIntegers
}
