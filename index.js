Object.assign(global, { components: {}, log: (...args) => console.log(...args) })

//load env
import dotenv from 'dotenv'
dotenv.config()
global.log('loaded env file')


// start server
import Fastify from 'fastify'
const server = Fastify({ logger: true })

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const startListening = async () => {
  try {
    await server.listen({ port: +process.env.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
startListening()