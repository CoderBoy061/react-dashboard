export const sidebarMenu = [
  {
    key: "dashboards",
    title: "Dashboards",
    items: [
      { key: "default", label: "Default", caret: true, icon: "grid" },
      { key: "ecommerce", label: "eCommerce", caret: true, icon: "cart" },
      { key: "projects", label: "Projects", caret: true, icon: "folder" },
      { key: "courses", label: "Online Courses", caret: true, icon: "play" },
    ],
  },
  {
    key: "pages",
    title: "Pages",
    items: [
      {
        key: "userprofile",
        label: "User Profile",
        caret: true,
        icon: "user",
        children: [
          { label: "Overview" },
          { label: "Projects" },
          { label: "Campaigns" },
          { label: "Documents" },
          { label: "Followers" },
        ],
      },
    ],
  },
  {
    key: "accounts",
    title: "Accounts",
    items: [
      {
        key: "account",
        label: "Account",
        caret: true,
        icon: "user",
      },
      {
        key: "corporate",
        label: "Corporate",
        caret: true,
        icon: "briefcase",
      },
      {
        key: "blog",
        label: "Blog",
        caret: true,
        icon: "blog",
      },
      {
        key: "social",
        label: "Social",
        caret: true,
        icon: "social",
      },
    ],
  },
];
