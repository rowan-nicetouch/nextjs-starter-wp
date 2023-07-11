export default function expandPath (aught) {
  const path = typeof aught === 'string'
    ? aught.split('/')
    : []

  const clean = path.map(Number)

  return clean
}
