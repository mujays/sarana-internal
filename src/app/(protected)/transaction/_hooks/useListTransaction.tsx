/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { TableProps, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { TransactionType } from "@/services/base/base.dto";

function useListTransaction({ page = 1, pageSize = 10 } = {}) {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["TRANSACTIONS", page, pageSize],
    queryFn: async () => {
      const response = await BaseService.getTransaction({
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

  const columns: TableProps<TransactionType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      align: "center",
    },
    {
      title: "Client ID",
      dataIndex: "client_id",
      render: (value = "") => <p>{value}</p>,
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
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value = "") => <p>{value}</p>,
    },
  ];

  return {
    columns,
    isLoading,
    transactions,
  };
}

export default useListTransaction;
