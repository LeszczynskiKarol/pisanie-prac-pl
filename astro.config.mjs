import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Replace SITE_URL_PLACEHOLDER with https://www.<domain> before first build.
//
// Ikony: WŁASNY system SVG (src/components/Icon.astro + src/icons/set.ts).
// Świadomie BEZ astro-icon / @iconify-json — własny zestaw ikon to twardy wymóg
// (CLAUDE.md "Ikony — własne SVG", playbook 05 §5). Nie dodawaj tu integracji icon().
export default defineConfig({
  site: "https://www.pisanie-prac.pl",

  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "weekly",
      priority: 0.7,
      // Wyklucz strony z noindex. Każda dodatkowa wyindeksowana podstrona
      // (regulamin, dziękujemy, draftowe landingi) idzie tutaj.
      filter: (page) =>
        !page.includes("/polityka-prywatnosci") &&
        !page.includes("/regulamin"),
      serialize(item) {
        if (item.url === "https://www.pisanie-prac.pl/") item.priority = 1.0;
        return item;
      },
    }),
  ],

  output: "static",

  build: {
    assets: "_assets",
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
    define: {
      "import.meta.env.PUBLIC_API_BASE_URL": JSON.stringify(
        process.env.PUBLIC_API_BASE_URL || ""
      ),
    },
  },
});
