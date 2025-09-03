"use client";
import { Button, Table } from "antd";
import { useState } from "react";
import AppBreadcrumbs from "@/components/common/app-breadcrums";
import useListPlan from "./_hooks/useListPlan";
import FormPlan from "./_components/form-plan";

function PlanPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const {
    columns,
    isLoading,
    plans,
    isOpenForm,
    setIsOpenForm,
    existingId,
    setExistingId,
  } = useListPlan({
    limit: pagination.pageSize,
    page: pagination.page,
  });

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            {
              title: "Home",
              url: "/",
            },
            {
              title: "Plan",
              url: "#",
            },
          ]}
        />
      </div>

      <div className="bg-white p-4 rounded-lg space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <p className="text-xl font-medium">Plan</p>
            <div className="flex gap-2">
              <Button onClick={() => setIsOpenForm(true)}>Tambah Plan</Button>
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <Table
            columns={columns}
            dataSource={plans?.data}
            loading={isLoading}
            pagination={{
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
              total: plans?.meta.total,
              pageSize: pagination.pageSize,
              current: pagination.page,
              position: ["bottomCenter"],
              size: "small",
            }}
          />
        </div>
      </div>
      <FormPlan
        close={() => {
          setIsOpenForm(false);
          setExistingId(null);
        }}
        isOpen={isOpenForm}
        existingId={existingId}
      />
    </div>
  );
}

export default PlanPage;
