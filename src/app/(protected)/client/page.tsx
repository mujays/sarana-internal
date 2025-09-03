"use client";
import { Button, Table } from "antd";
import { useState } from "react";
import AppBreadcrumbs from "@/components/common/app-breadcrums";
import useListClient from "./_hooks/useListClient";
import FormClient from "./_components/form-client";

function ClientPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const {
    columns,
    isLoading,
    clients,
    isOpenForm,
    setIsOpenForm,
    existingId,
    setExistingId,
  } = useListClient({
    limit: pagination.pageSize,
    page: pagination.page,
  });

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            { title: "Home", url: "/" },
            { title: "Client", url: "#" },
          ]}
        />
      </div>

      <div className="bg-white p-4 rounded-lg space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <p className="text-xl font-medium">List Klien</p>
            <div className="flex gap-2">
              <Button onClick={() => setIsOpenForm(true)}>Tambah Client</Button>
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <Table
            columns={columns}
            dataSource={clients?.data}
            loading={isLoading}
            pagination={{
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
              total: clients?.meta?.total,
              pageSize: pagination.pageSize,
              current: pagination.page,
              position: ["bottomCenter"],
              size: "small",
            }}
          />
        </div>
      </div>
      <FormClient
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

export default ClientPage;
