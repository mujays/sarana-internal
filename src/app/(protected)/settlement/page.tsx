"use client";
import { Table } from "antd";
import AppBreadcrumbs from "@/components/common/app-breadcrums";
import useListSettlement from "./_hooks/useListSettlement";
import { useState } from "react";

function SettlementPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const { columns, isLoading, settlements } = useListSettlement({
    page: pagination.page,
    pageSize: pagination.pageSize,
  });
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            { title: "Home", url: "/" },
            { title: "Settlement", url: "#" },
          ]}
        />
      </div>
      <div className="bg-white p-4 rounded-lg space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <p className="text-xl font-medium">Settlement</p>
          </div>
        </div>
        <div className="overflow-auto">
          <Table
            columns={columns}
            dataSource={settlements?.data}
            loading={isLoading}
            pagination={{
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
              total: settlements?.meta?.total,
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

export default SettlementPage;
