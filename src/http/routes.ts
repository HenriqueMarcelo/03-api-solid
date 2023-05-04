import { FastifyInstance } from 'fastify'
import { register } from './constrollers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
