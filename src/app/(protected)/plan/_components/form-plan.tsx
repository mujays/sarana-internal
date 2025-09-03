/* eslint-disable @typescript-eslint/no-explicit-any */
import errorResponse from "@/lib/error";
import BaseService from "@/services/base/base.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FormPlan({
  existingId,
  close,
  isOpen,
}: {
  existingId?: number | null;
  close: () => void;
  isOpen: boolean;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: apps } = useQuery({
    queryKey: ["APPS"],
    queryFn: async () => {
      const response = await BaseService.getApp({
        page_size: 50,
        page: 1,
      });
      return response;
    },
  });

  const { data: plan, isLoading } = useQuery({
    queryKey: ["PLAN", existingId],
    enabled: !!existingId,
    queryFn: async () => {
      const response = await BaseService.getOnePlan(existingId!);
      return response;
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);

      if (existingId) {
        await BaseService.updatePlan(existingId, val);
      } else {
        await BaseService.addPlan(val);
      }

      queryClient.invalidateQueries({
        queryKey: ["PLANS"],
      });

      toast.success("Plan berhasil dibuat");
      form.resetFields();
      close();
    } catch (error) {
      errorResponse(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingId && plan) {
      console.log({ plan });
      form.setFieldsValue({
        name: plan.data.name,
        description: plan.data?.description || "",
        app_id: plan.data.app_id,
        duration: plan.data.duration,
        harga: plan.data.harga,
      });
    }
  }, [existingId, plan]);

  return (
    <>
      <Modal
        open={isOpen}
        maskClosable={false}
        onCancel={() => {
          close();
          form.resetFields();
        }}
        okText={existingId ? "Simpan" : "Tambah"}
        okButtonProps={{
          onClick: form.submit,
        }}
        loading={isLoading}
        confirmLoading={loading}
        title={
          <Typography.Title level={4}>
            {existingId ? "Edit Plan" : "Tambah Plan"}
          </Typography.Title>
        }
      >
        <Form
          form={form}
          requiredMark
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Nama Plan"
            name="name"
            className="w-full !mb-2"
            rules={[{ required: true, message: "Nama Plan harus diisi" }]}
          >
            <Input placeholder="Nama" />
          </Form.Item>
          <Form.Item
            label="Deskripsi"
            name="description"
            className="w-full !mb-2"
          >
            <Input.TextArea placeholder="Deskripsi" />
          </Form.Item>

          <Form.Item
            name="app_id"
            label="App"
            className="!mb-2 w-full"
            rules={[{ required: true, message: "App harus diisi" }]}
          >
            <Select
              placeholder="Pilih App"
              options={apps?.data.map((val) => ({
                label: val.name,
                value: val.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Durasi (Hari)"
            name="duration"
            className="w-full !mb-2"
            rules={[{ required: true, message: "Durasi harus diisi" }]}
          >
            <Input
              className="!w-full"
              min={0}
              placeholder="0"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                form.setFieldsValue({ duration: value });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Harga"
            name="harga"
            className="w-full !mb-2"
            rules={[{ required: true, message: "Harga harus diisi" }]}
          >
            <Input
              className="!w-full"
              min={0}
              placeholder="0"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                form.setFieldsValue({ harga: value });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default FormPlan;
