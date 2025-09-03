"use client";
import { Button, Table } from "antd";
import AppBreadcrumbs from "@/components/common/app-breadcrums";
import useListApp from "./_hooks/useListApp";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AppPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const { columns, isLoading, apps } = useListApp();
  const router = useRouter();
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            { title: "Home", url: "/" },
            { title: "App", url: "#" },
          ]}
        />
      </div>
      <div className="bg-white p-4 rounded-lg space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <p className="text-xl font-medium">App</p>
            <div className="flex gap-2">
              <Button onClick={() => router.push("/app/add")}>
                Tambah App
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <Table
            columns={columns}
            dataSource={apps?.data}
            loading={isLoading}
            pagination={{
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
              total: apps?.meta?.total,
              pageSize: pagination.pageSize,
              current: pagination.page,
              position: ["bottomCenter"],
              size: "small",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AppPage;
