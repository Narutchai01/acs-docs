import { DefaultTheme } from "vitepress";

export const githubSidebars: DefaultTheme.Sidebar = {
  "/service/github": [
    {
      text: "GitHub",
      items: [
        { text: "Introduction", link: "/service/github" },
        {
          text: "GIT 1O1",
          link: "/service/github/beginner",
        },
      ],
    },
  ],
};
