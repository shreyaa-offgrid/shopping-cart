import { defineConfig } from 'vite' //essentially saying this object is a Vite configuration
import react from '@vitejs/plugin-react' //without this plugin Vite only knows how to compile javascript, not JSX

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({ //exports the config so that Vite can read it
  plugins: [react(), cloudflare()], //to tell vite to enable the react plugin
  test: { //Vitest is made by Vite, so it reads this same config file, this particular line is meant for confuring Vitest
    globals: true, //without this every test file would need to import test, expect, describe
    environment: "jsdom", //Vitest runs in Node which is not a browser and has no document, jsdom creates fake browser
    setupFiles: "./src/tests/setupTests.js",
  }
})