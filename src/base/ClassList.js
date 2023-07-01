/**
 * Constructor which makes it easy to work with HTML element class attribute
 * values which may be represented as either strings, arrays or combinations of
 * the two.
 */
export default class ClassList  {
  names = new Set()
  length = 0
  constructor (...aught) {
    let classNames = []
    aught.forEach (className => {
      let incoming = []
      if (typeof className === 'string') {
        incoming = className.split(' ').filter(Boolean)
      } else if (Array.isArray(className)) {
        incoming = className
      }

      incoming.forEach(c => classNames.push(c))
    })

    this.names = new Set(classNames)
    this.length = this.names.size
  }
  add (aught) {
    if (typeof aught === 'string') {
      this.names.add(aught)
      this.length = this.names.size
    }
  }
  toString () {
    return [...this.names].join(' ')
  }
  /**
   * Get class list for use as the value of a JSX attribute.
   *
   * Will return `null` when `this.names` is empty.
   * @return {String | null} A string containing one or more class names
   *   seperated by spaces or null when no classes exist.
   */
  attr () {
    const string = [...this.names].join(' ')
    return string || null
  }
  /**
   * Get class list as an array.
   *
   * @return {Array}
   */
  getArray () {
    return this.names
  }
}
