export default function makePath (aught) {
  aught = Array.isArray(aught) ? aught : []
  return aught.join('/')
}
