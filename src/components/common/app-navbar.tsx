"use client";

import { logout } from "@/lib/session";
import { authStore } from "@/store/auth.store";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Typography } from "antd";
import { SidebarTrigger } from "../ui/sidebar";

function AppNavbar() {
  const { user, logout: logoutStore } = authStore();

  const handleLogout = () => {
    logoutStore();
    logout();
    window.location.href = "/login";
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex flex-col">
          <Typography.Text strong>{user?.name || "User"}</Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {user?.email}
          </Typography.Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="h-12 px-4 w-full border-b flex justify-between items-center bg-white">
      <SidebarTrigger />

      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="cursor-pointer flex items-center gap-2 hover:bg-gray-50 p-1 rounded-full pr-3 transition-colors">
          <Avatar icon={<UserOutlined />} src={user?.avatar} />
          <div className="hidden md:block text-sm font-medium">
            {user?.name || "User"}
          </div>
        </div>
      </Dropdown>
    </nav>
  );
}

export default AppNavbar;
