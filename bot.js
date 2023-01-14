import { Puppy } from "./puppy.js";

export class Bot {
  // 60mins!!!
  // #afterEvery = 60 * 60 * 1000;
  #afterEvery = 5 * 1000;
  #puppy;

  static async spawn() {
    this.#puppy = await Puppy.create();
    this.#runJob();
  }

  #scheduleJob() {
    setTimeout(this.#runJob.bind(this), this.#afterEvery);
  }

  #runJob() {
    try {
      global.log.info("yooo");
    } catch (err) {
      global.log.error(err);
    } finally {
      this.#scheduleJob();
    }
  }
}
