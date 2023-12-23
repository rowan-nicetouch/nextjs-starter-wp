
export function readWpDate (aught:any) : string {
  try {
    const dateObj = new Date(aught)

    const date = [
      String(dateObj.getFullYear()),
      String(dateObj.getMonth() + 1).padStart(2, '0'),
      String(dateObj.getDate()).padStart(2, '0'),
    ]

    const time = [
      String(dateObj.getHours()).padStart(2, '0'),
      String(dateObj.getMinutes()).padStart(2, '0'),
      String(dateObj.getSeconds()).padStart(2, '0'),
    ]

    const joined = date.join('-') + 'T' + time.join(':')

    return aught === joined ? joined : ''
  } catch (error) {
    return ''
  }
}
