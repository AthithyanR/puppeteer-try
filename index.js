Object.assign(global, {
  components: {},
});

//load env
import dotenv from "dotenv";
dotenv.config();
console.log("loaded env file");

// start server
import Fastify from "fastify";
import fs from "fs";

import { Puppy } from "./puppy.js";
import { constants } from "./utils.js";

const server = Fastify({ logger: true });

server.get("/get-ss", async (_request, reply) => {
  try {
    const stream = fs.createReadStream(constants.ss_name);
    reply.type("image/jpeg");
    reply.send(stream);
    return reply;
  } catch (err) {
    server.log.error(err);
    throw err;
  }
});

server.put("/update-ss", async () => {
  try {
    const puppy = await Puppy.create();
    await puppy.goto(constants.url, { props: constants.props });
    await puppy.ss(constants.ss_name);
    await puppy.close();
    return { message: "updated" };
  } catch (err) {
    server.log.error(err);
    throw err;
  }
});

const startListening = async () => {
  try {
    await server.listen({ port: +process.env.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
startListening();
