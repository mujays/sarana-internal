"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenus } from "@/configs/menus";

const isActive = (pathname: string, item: string) => {
  if (item === "/" && pathname === "/") {
    return true;
  }

  if (item !== "/" && pathname.startsWith(item)) {
    return true;
  }

  return false;
};

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-red-300">
      <SidebarContent>
        <SidebarHeader className="flex justify-center items-center">
          <div className="w-[180px] text-2xl font-semibold flex justify-center mt-10">
            Internal App
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenus(pathname).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      `py-5 flex gap-2 transition-all duration-300 hover:bg-primary/75 hover:text-white`,
                      isActive(pathname, item.url) &&
                        "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
