/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { TableProps, Tag, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { SettlementType } from "@/services/base/base.dto";

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
    // {
    //   title: "Client",
    //   dataIndex: "client",
    //   render: (value) => <p>{value?.nama || "-"}</p>,
    // },
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
        ) : (
          <Tag color="red" className="capitalize">
            {value}
          </Tag>
        ),
    },
  ];

  return {
    columns,
    isLoading,
    settlements,
  };
}

export default useListSettlement;
