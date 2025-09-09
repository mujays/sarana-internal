/* eslint-disable @typescript-eslint/no-explicit-any */
import errorResponse from "@/lib/error";
import BaseService from "@/services/base/base.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FormSettlement({
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

  const { data: settlement, isLoading } = useQuery({
    queryKey: ["SETTLEMENT", existingId],
    enabled: !!existingId,
    queryFn: async () => {
      const response = await BaseService.getSettlementOne(existingId as number);
      return response.data || null;
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);
      if (existingId) {
        await BaseService.updateSettlement(existingId, val);
      } else {
        await BaseService.addSettlement(val);
      }
      queryClient.invalidateQueries({ queryKey: ["SETTLEMENTS"] });
      toast.success("Settlement berhasil disimpan");
      form.resetFields();
      close();
    } catch (error) {
      errorResponse(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingId && settlement) {
      form.setFieldsValue({
        jumlah: settlement.jumlah,
        by: settlement.by,
        tujuan: settlement.tujuan,
        status: settlement.status,
      });
    }
  }, [existingId, settlement, form]);

  return (
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
          {existingId ? "Edit Settlement" : "Tambah Settlement"}
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
          label="Jumlah"
          name="jumlah"
          className="w-full !mb-2"
          rules={[{ required: true, message: "Jumlah harus diisi" }]}
        >
          <Input placeholder="Jumlah" type="number" min={0} />
        </Form.Item>
        <Form.Item
          label="By"
          name="by"
          className="w-full !mb-2"
          rules={[{ required: true, message: "By harus diisi" }]}
        >
          <Input placeholder="By" />
        </Form.Item>
        <Form.Item
          label="Tujuan"
          name="tujuan"
          className="w-full !mb-2"
          rules={[{ required: true, message: "Tujuan harus diisi" }]}
        >
          <Input placeholder="Tujuan" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          className="!mb-2 w-full"
          rules={[{ required: true, message: "Status harus diisi" }]}
        >
          <Select
            placeholder="Pilih Status"
            options={[
              { label: "Accepted", value: "accepted" },
              { label: "Pending", value: "pending" },
              { label: "Succeeded", value: "succeeded" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormSettlement;
