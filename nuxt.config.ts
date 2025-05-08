// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Blog - Nuxt MDC",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui-pro",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/mdc",
    "@nuxt/fonts",
  ],
  future: { compatibilityVersion: 4 },
  css: ["~/assets/css/main.css"],
  fonts: {
    defaults: {
      weights: [400, 600, 700],
      styles: ["normal", "italic"],
      subsets: [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },
    families: [
      {
        name: "Montserrat",
        provider: "google",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  mdc: {
    // Add custom plugins to the markdown processor
    remarkPlugins: {
      /**
       * To add plugins you need to add the plugin name as key and an object containing:
       * - the plugin src (local or remote)
       * - the plugin options (optional)
       *
       * This will be converted to a default import @see https://github.com/nuxt-modules/mdc/blob/58e5ef0d820d9d33f057cb9f50b4aa0d26fb6ca8/src/templates/mdc-imports.ts#L35
       */
      remarkCustomUnderline: {
        src: resolve("./markdown-plugins/remarkCustomUnderline"),
      },
      // Add more plugins here
    },
    highlight: {
      // shiki is the default highlighter, you can find more info on supported themes and languages in shiki documentation
      // @see https://shiki.style/guide/
      wrapperStyle:
        "overflow: hidden; border-radius: var(--radius-md); background-color: var(--color-gray-300); padding: calc(var(--spacing) * 4);",
      theme: "vitesse-light",
      //langs: [...langs, "yaml", "md", "js"], // extend the default languages with yaml and md --> TEMPORARILY COMMENTED
    },
    components: {
      map: {
        // here you can override the default components with your own
        code: "CustomProseCode",
        h1: "CustomProseH1",
        h2: "CustomProseH2",
        h3: "CustomProseH3",
        h4: "CustomProseH4",
        h5: "CustomProseH5",
        h6: "CustomProseH6",
        p: "CustomProseP",
        a: "CustomProseA",
        img: "CustomProseImg",
      },
    },
  },
  components: {
    dirs: [
      {
        // Custom Prose components need to be added to the global components
        global: true,
        path: "~/components/Prose",
      },
      "~/components",
    ],
  },
});
