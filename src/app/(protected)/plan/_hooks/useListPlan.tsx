/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { TableProps, Typography } from "antd";
import "moment/locale/id";
import BaseService from "@/services/base/base.service";
import { PlanType } from "@/services/base/base.dto";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import ActionTable from "@/components/common/action-table";
import errorResponse from "@/lib/error";
import { toast } from "sonner";
import { PlanDetail } from "../_components/plan-detail";

type Props = {
  page: number;
  limit: number;
};

function useListPlan({ limit, page }: Props) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [existingId, setExistingId] = useState<number | null>(null);

  const { data: plans, isLoading } = useQuery({
    queryKey: ["PLANS", page, limit],
    queryFn: async () => {
      const response = await BaseService.getPlan({
        page_size: limit,
        page,
        with: "app",
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
      await BaseService.deletePlan(id);
      setExistingId(null);
      toast.success("Plan berhasil dihapus");
    } catch (error: any) {
      errorResponse(error);
    }
  };

  const columns: TableProps<PlanType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      align: "center",
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      render: (value = 0) => <p>{formatCurrency(value)}</p>,
    },
    {
      title: "Durasi",
      dataIndex: "duration",
      render: (value = "") => <p>{value}</p>,
    },
    {
      title: "App",
      dataIndex: "app",
      render: (value, rec) => <p>{rec.app.name}</p>,
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
            componentDetail={<PlanDetail planData={record} />}
          />
        );
      },
    },
  ];
  return {
    columns,
    isLoading,
    plans,
    isOpenForm,
    setIsOpenForm,
    setExistingId,
    existingId,
  };
}

export default useListPlan;
