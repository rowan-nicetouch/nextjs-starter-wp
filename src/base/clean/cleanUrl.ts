'use strict'

export function cleanUrl (aught:any) : string {
  try {
    const url = new URL(aught)
    return !aught.endsWith('/') && url.pathname === '/'
      ? url.href.slice(0, -1)
      : url.href
  } catch (error) {
    return ''
  }
}
