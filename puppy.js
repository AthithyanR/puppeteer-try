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

    getPage() { return Object.freeze(this.#page) }

    async goto(url, opts = {}) {
        const { props = {}, viewport } = opts
        await this.#page.goto(url, props)
        await this.setViewport(viewport)
    }

    setViewport(viewport = {}) {
        return this.#page.setViewport({ ...this.#defaultViewport, ...viewport })
    }

    close() {
        return this.#browser.close()
    }
}