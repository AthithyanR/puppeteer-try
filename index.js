Object.assign(global, { components: {}, log: (...args) => console.log(...args) })

//load env
import dotenv from 'dotenv'
dotenv.config()
global.log('loaded env file')


// start server
import Fastify from 'fastify'
import fs from 'fs'

import { Puppy } from './puppy.js'

const server = Fastify({ logger: true })

const constants = {
  url: 'https://dev.to/',
  props: { waitUntil: 'networkidle0' },
  ss_name: 'screenshot.jpg'
}

server.get('/', async (request, reply) => {
  try {
    const puppy = await Puppy.create()
    await puppy.goto(constants.url, { props: constants.props })
    await puppy.ss(constants.ss_name)
    await puppy.close()
    const stream = fs.createReadStream(constants.ss_name)
    reply.header('Content-Type', 'image/jpg')
    reply.send(stream)
  } catch (err) {
    console.log(err)
    return {}
  }

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