import readWpTerm from 'base/read/readWpTerm'

export default function _readWpPostTerms (terms) {
  terms = Array.isArray(terms) ? terms : []

  const output = {
    categories: [],
    tags: [],
    terms: []
  }

  terms.forEach(group => {
    group = Array.isArray(group) ? group : []
    group.forEach(term => {
      console.log('term',term)
      term = readWpTerm(term)
      const map = new Map(Object.entries({
        category: output.categories,
        post_tag: output.tags,
      }))
      if (map.has(term.taxonomy)) {
        map.get(term.taxonomy).push(term)
      } else {
        output.terms.push(term)
      }
    })
  })

  return output
}
