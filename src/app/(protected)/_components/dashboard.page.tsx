"use client";

import AppBreadcrumbs from "@/components/common/app-breadcrums";
import BaseService from "@/services/base/base.service";
import { useQuery } from "@tanstack/react-query";

function DashboardPage() {
  const { data: balance, isLoading } = useQuery({
    queryKey: ["SELF_BALANCE"],
    queryFn: async () => {
      const response = await BaseService.getSelfBalance();
      return response;
    },
  });

  console.log({ selfBalance: balance });
  return (
    <div className="p-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            {
              title: "Dashboard",
              url: "#",
            },
          ]}
        />
        <p className="text-xl font-medium">Dashboard</p>
      </div>
    </div>
  );
}

export default DashboardPage;
