/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { TableProps, Typography } from "antd";
import BaseService from "@/services/base/base.service";
import { ClientType } from "@/services/base/base.dto";
import { useState } from "react";
import ActionTable from "@/components/common/action-table";
import errorResponse from "@/lib/error";
import { toast } from "sonner";

type Props = {
  page: number;
  limit: number;
};

function useListClient({ limit, page }: Props) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [existingId, setExistingId] = useState<number | null>(null);

  const { data: clients, isLoading } = useQuery({
    queryKey: ["CLIENTS", page, limit],
    queryFn: async () => {
      const response = await BaseService.getClient({
        page_size: limit,
        page,
      });
      return response;
    },
    select(data) {
      return {
        ...data,
        data: data.data.map((val, index) => ({
          ...val,
          no: index + 1 + limit * page - limit,
        })),
      };
    },
  });

  const onDelete = async (id: number) => {
    try {
      await BaseService.deleteClient(id);
      setExistingId(null);
      toast.success("Client berhasil dihapus");
    } catch (error: any) {
      errorResponse(error);
    }
  };

  const columns: TableProps<ClientType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      align: "center",
    },
    {
      title: "Nama",
      dataIndex: "nama",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "No PIC",
      dataIndex: "no_telp_pic",
      render: (value = "") => <p>{value || "-"}</p>,
    },
    {
      title: "PIC",
      dataIndex: "pic",
      render: (value = "") => <p>{value || "-"}</p>,
    },
    {
      title: "Email PIC",
      dataIndex: "email_pic",
      render: (value = "") => <p>{value || "-"}</p>,
    },
    {
      title: "Action",
      key: "",
      render: (value, record) => {
        return (
          <ActionTable
            onEdit={() => {
              setExistingId(record.id);
              setIsOpenForm(true);
            }}
            onDelete={() => onDelete(record.id)}
          />
        );
      },
    },
  ];
  return {
    columns,
    isLoading,
    clients,
    isOpenForm,
    setIsOpenForm,
    setExistingId,
    existingId,
  };
}

export default useListClient;
