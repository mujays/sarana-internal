/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableProps, Tag, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { WithdrawalType } from "@/services/base/base.dto";
import ActionTable from "@/components/common/action-table";
import { toast } from "sonner";
import errorResponse from "@/lib/error";

function useListWithdrawal({ page = 1, pageSize = 10 } = {}) {
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ["WITHDRAWALS", page, pageSize],
    queryFn: async () => {
      const response = await BaseService.getWithdrawal({
        page_size: pageSize,
        page,
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
      await BaseService.deleteWithdrawal(id);
      setExistingId(null);
      toast.success("Withdrawal berhasil dihapus");
    } catch (error: any) {
      errorResponse(error);
    }
  };

  const columns: TableProps<WithdrawalType>["columns"] = [
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
      title: "Status",
      dataIndex: "status",
      render: (value = "") =>
        value.toLowerCase() === "berhasil" ? (
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
        />
      ),
    },
  ];

  return {
    columns,
    isLoading,
    withdrawals,
    isOpenForm,
    setIsOpenForm,
    existingId,
    setExistingId,
  };
}

export default useListWithdrawal;
