import fs from 'node:fs'
import { parse } from 'csv-parse';

const csvPath = new URL('./seeds/tasks.csv', import.meta.url)

const csvStream = fs.createReadStream(csvPath);

const csvParser = parse({
  delimiter: '#',
  skipEmptyLines: true,
  fromLine: 2
})

export async function seeder() {
  const lines = csvStream.pipe(csvParser)

  for await (const line of lines) {
    const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

seeder()