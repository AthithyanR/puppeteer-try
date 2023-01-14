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

const server = Fastify({ logger: true });
global.log = server.log

import { Puppy } from "./puppy.js";
import { Bot } from "./bot.js";
import { constants } from "./utils.js";

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
    const { page } = puppy
    await puppy.goto(constants.taget_url, { props: constants.puppy_goto_props });
    await page.screenshot({ path: constants.ss_name });
    await puppy.close();
    return { message: "updated" };
  } catch (err) {
    server.log.error(err);
    throw err;
  }
});

// should crawl for content
server.put("/temp", async () => {
  try {

  } catch (err) {
    server.log.error(err);
    throw err;
  }
});

const startListening = async () => {
  try {
    // wake up the bot
    // new Bot()
    await server.listen({ port: +process.env.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startListening();
