// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import langs from "@shikijs/langs/javascript";

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
    highlight: {
      // shiki is the default highlighter, you can find more info on supported themes and languages in shiki documentation
      // @see https://shiki.style/guide/
      wrapperStyle: "rounded-lg overflow-hidden bg-gray-900",
      theme: "vitesse-light",
      langs: [...langs, "yaml"], // extend the default languages with yaml and md
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
