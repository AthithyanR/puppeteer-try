import puppeteer from "puppeteer"

export class Puppy {
    #browser
    #page
    #defaultViewport = { width: 1280, height: 720 }

    async init() {
        this.#browser = await puppeteer.launch()
        this.#page = await this.#browser.newPage()
    }

    static async create() {
        const newPuppy = new Puppy();
        await newPuppy.init()
        return newPuppy
    }

    async goto(url, opts = {}) {
        const { props = {}, viewport } = opts
        await this.#page.goto(url, props)
        await this.setViewport(viewport)
    }

    async setViewport(viewport = {}) {
        await this.#page.setViewport({ ...this.#defaultViewport, ...viewport })
    }

    async ss(path = 'screenshot.jpg') {
        await this.#page.screenshot({
            path
        });
    }

    close() {
        return this.#browser.close()
    }
}