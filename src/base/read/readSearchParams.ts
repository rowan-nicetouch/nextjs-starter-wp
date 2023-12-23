export function readSearchParams (params: any) : URLSearchParams {
  const isStringable = (aught:any) => {
    return ['number', 'string'].indexOf(typeof aught) > -1
  }
  const output = new URLSearchParams()
  for (const key in params) {
    if (isStringable(params[key])) {
      output.append(key, String(params[key]))
    } else if (params[key] === true) {
      output.append(key, '1')
    } else if (Array.isArray(params[key])) {
      const values:Array<string> = []
      params[key].forEach((value:any) => {
        if (isStringable(value)) {
          values.push(String(value))
        } else if (params[key] === true) {
          output.append(key, '1')
        }
      })
      if (values.length > 0) {
        output.append(key, String(values.join(',')))
      }
    }
  }
  return output
}
