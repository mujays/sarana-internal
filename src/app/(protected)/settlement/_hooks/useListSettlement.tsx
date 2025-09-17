/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableProps, Tag, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { SettlementType } from "@/services/base/base.dto";
import ActionTable from "@/components/common/action-table";
import { SettlementDetail } from "../_components/settlement-detail";
import { toast } from "sonner";
import errorResponse from "@/lib/error";

function useListSettlement({ page = 1, pageSize = 10 } = {}) {
  const { data: settlements, isLoading } = useQuery({
    queryKey: ["SETTLEMENTS", page, pageSize],
    queryFn: async () => {
      const response = await BaseService.getSettlement({
        page_size: pageSize,
        page,
        with: "client",
      });
      return response;
    },
    select(data) {
      return {
        ...data,
        data: data.data.map((val, index) => ({
          ...val,
          no: index + 1 + pageSize * page - pageSize,
        })),
      };
    },
  });

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [existingId, setExistingId] = useState<number | null>(null);

  const onDelete = async (id: number) => {
    try {
      await BaseService.deleteClient(id);
      setExistingId(null);
      toast.success("Settlement berhasil dihapus");
    } catch (error: any) {
      errorResponse(error);
    }
  };

  const columns: TableProps<SettlementType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      align: "center",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (value, record) => <p>{record.client?.nama || "-"}</p>,
    },
    {
      title: "By",
      dataIndex: "by",
      render: (value) => <p>{value || "-"}</p>,
    },
    {
      title: "Metode",
      dataIndex: "xendit_payout_id",
      render: (value) => <p>{!value ? "Manual" : "Xendit"}</p>,
    },
    {
      title: "Tujuan",
      dataIndex: "tujuan",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value = "") =>
        value.toLowerCase() === "accepted" ? (
          <Tag color="green" className="capitalize">
            {value}
          </Tag>
        ) : value.toLowerCase() === "pending" ? (
          <Tag color="orange" className="capitalize">
            {value}
          </Tag>
        ) : value.toLowerCase() === "succeeded" ? (
          <Tag color="blue" className="capitalize">
            {value}
          </Tag>
        ) : (
          <Tag color="red" className="capitalize">
            {value}
          </Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (value, record) => (
        <ActionTable
          onEdit={() => {
            setExistingId(record.id);
            setIsOpenForm(true);
          }}
          onDelete={() => onDelete(record.id)}
          componentDetail={<SettlementDetail settlementData={record} />}
        />
      ),
    },
  ];

  return {
    columns,
    isLoading,
    settlements,
    isOpenForm,
    setIsOpenForm,
    existingId,
    setExistingId,
  };
}

export default useListSettlement;
