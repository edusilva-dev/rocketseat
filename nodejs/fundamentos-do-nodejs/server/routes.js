import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/users/:userId'),
    handler: (req, res) => {
      const { userId } = req.params

      const { name, email } = req.body

      database.update('users', userId, {
        name,
        email
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:userId'),
    handler: (req, res) => {
      const { userId } = req.params

      database.delete('users', userId)

      return res.writeHead(204).end()
    }
  },
]