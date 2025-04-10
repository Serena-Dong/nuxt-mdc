// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
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
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxt/icon", "@nuxtjs/mdc"],
  future: { compatibilityVersion: 4 },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
  mdc: {
    components: {
      map: {
        code: "CustomProseCode",
        h1: "CusstomProseH1",
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
        global: true,
        path: "./components/prose",
      },
    ],
  },
});
