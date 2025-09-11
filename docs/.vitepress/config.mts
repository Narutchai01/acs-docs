import { defineConfig } from "vitepress";
import { autoSidebar } from "./sidebars/auto.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/",
  title: "ACS Document",
  description: "document for acs student",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "GitHub", link: "/service/github" },
      {
        text: "RoadMap",
        items: [
          { text: "Developer", link: "/service/developer" },
          { text: "UX/UI", link: "/service/designer" },
        ],
      },
    ],

    sidebar: {
      "/service/github": autoSidebar("/service/github"),
      "/service/developer": autoSidebar("/service/developer"),
      "/service/designer": autoSidebar("/service/designer"),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
