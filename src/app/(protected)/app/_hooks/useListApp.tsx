/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TableProps, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { AppType } from "@/services/base/base.dto";
import ActionTable from "@/components/common/action-table";
import { useRouter } from "next/navigation";
import errorResponse from "@/lib/error";
import { toast } from "sonner";
import { AppDetail } from "../_components/app-detail";

function useListApp() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: apps, isLoading } = useQuery({
    queryKey: ["APPS"],
    queryFn: async () => {
      const response = await BaseService.getApp({
        page_size: 50,
        page: 1,
      });
      return response;
    },
    select(data) {
      return {
        ...data,
        data: data.data.map((val, index) => ({
          ...val,
          no: index + 1,
        })),
      };
    },
  });

  const onDelete = async (id: number) => {
    try {
      await BaseService.deleteApp(id);
      queryClient.invalidateQueries({ queryKey: ["APPS"] });
      toast.success("App berhasil dihapus");
    } catch (error: any) {
      errorResponse(error);
    }
  };

  const columns: TableProps<AppType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      align: "center",
    },
    {
      title: "Kode",
      dataIndex: "kode",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Jenis",
      dataIndex: "jenis",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Action",
      key: "",
      render: (value, record) => {
        return (
          <ActionTable
            onEdit={() => router.push(`/app/${record.id}/edit`)}
            onDelete={() => onDelete(record.id)}
            componentDetail={<AppDetail appData={record} />}
          />
        );
      },
    },
  ];

  return {
    columns,
    isLoading,
    apps,
  };
}

export default useListApp;
