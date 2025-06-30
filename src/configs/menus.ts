import { Home, UsersRoundIcon } from "lucide-react";

export const getMenus = (pathName: string) => {
  if (pathName.startsWith("/user-management")) {
    return [
      {
        title: "User",
        url: "/user-management",
        icon: UsersRoundIcon,
      },
    ];
  }

  return [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
  ];
};
