/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { TableProps, Tag, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { TransactionType } from "@/services/base/base.dto";
import { formatCurrency } from "@/lib/utils";
import ActionTable from "@/components/common/action-table";
import { TransactionDetail } from "../_components/transaction-detail";

function useListTransaction({ page = 1, pageSize = 10 } = {}) {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["TRANSACTIONS", page, pageSize],
    queryFn: async () => {
      const response = await BaseService.getTransaction({
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

  const columns: TableProps<TransactionType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      align: "center",
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (value) => <p>{value?.nama || "-"}</p>,
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Net Payment",
      dataIndex: "net_payment",
      render: (value = "") => <p>{formatCurrency(value)}</p>,
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
        ) : (
          <Tag color="red" className="capitalize">
            {value}
          </Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (value, record) => (
        <ActionTable
          componentDetail={<TransactionDetail transactionData={record} />}
        />
      ),
    },
  ];

  return {
    columns,
    isLoading,
    transactions,
  };
}

export default useListTransaction;
