import { DefaultTheme } from "vitepress";

export const roadmapSidebars: DefaultTheme.Sidebar = {
  "/service/roadmap": [
    {
      text: "Roadmap",
      items: [
        { text: "Developer", link: "/service/developer" },
        { text: "UX/UI", link: "/service/designer" },
        { text: "Data Science / AI", link: "/service/datasci" },
        { text: "Server", link: "/service/server" },
      ],
    },
  ],
};
