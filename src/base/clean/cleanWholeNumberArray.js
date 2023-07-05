import cleanWholeNumber from 'base/clean/cleanWholeNumber'

export default function cleanWholeNumberArray (aught) {
  aught = Array.isArray(aught) ? aught : []
  const wholeNumbers = aught.map(n => cleanWholeNumber(n))
  const positiveIntegers = wholeNumbers.filter(Boolean)
  return positiveIntegers
}
