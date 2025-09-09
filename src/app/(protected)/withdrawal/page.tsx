"use client";
import { Button, Table } from "antd";
import AppBreadcrumbs from "@/components/common/app-breadcrums";
import useListWithdrawal from "./_hooks/useListWithdrawal";
import { useState } from "react";
import FormWithdrawal from "./_components/form-withdrawal";

function WithdrawalPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const {
    columns,
    isLoading,
    withdrawals,
    existingId,
    isOpenForm,
    setIsOpenForm,
    setExistingId,
  } = useListWithdrawal({
    page: pagination.page,
    pageSize: pagination.pageSize,
  });
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            { title: "Home", url: "/" },
            { title: "Withdrawal", url: "#" },
          ]}
        />
      </div>
      <div className="bg-white p-4 rounded-lg space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <p className="text-xl font-medium">Withdrawal</p>
            <Button onClick={() => setIsOpenForm(true)}>
              Tambah Withdrawal
            </Button>
          </div>
        </div>
        <div className="overflow-auto">
          <Table
            columns={columns}
            dataSource={withdrawals?.data}
            loading={isLoading}
            pagination={{
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
              total: withdrawals?.meta?.total,
              pageSize: pagination.pageSize,
              current: pagination.page,
              position: ["bottomCenter"],
              size: "small",
            }}
          />
        </div>
      </div>
      <FormWithdrawal
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

export default WithdrawalPage;
