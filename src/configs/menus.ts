import {
  Gauge,
  LayoutGrid,
  NotepadTextIcon,
  UserIcon,
  UsersRoundIcon,
} from "lucide-react";

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
      icon: Gauge,
    },
    {
      title: "Apps",
      url: "/app",
      icon: LayoutGrid,
    },
    {
      title: "Plan",
      url: "/plan",
      icon: NotepadTextIcon,
    },
    {
      title: "Client",
      url: "/client",
      icon: UserIcon,
    },
  ];
};
