export async function parseCSV(req) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const lines = Buffer.concat(buffers).toString().split('\r\n')

  const keys = lines.splice(0, 1)[0].split(',')

  return lines.reduce((acc, currentValue) => {
    const values = {}

    currentValue.split(',').forEach((value, valueIndex) => {
      values[keys[valueIndex]] = value
    })

    acc.tasks.push(values)

    return acc
  }, { tasks: [] })
}