/* eslint-disable @typescript-eslint/no-explicit-any */
import errorResponse from "@/lib/error";
import BaseService from "@/services/base/base.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FormWithdrawal({
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

  const { data: withdrawal, isLoading } = useQuery({
    queryKey: ["WITHDRAWAL", existingId],
    enabled: !!existingId,
    queryFn: async () => {
      const response = await BaseService.getOneWithdrawal(existingId as number);
      return response.data || null;
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);
      if (existingId) {
        await BaseService.updateWithdrawal(existingId, {
          ...val,
          tanggal_transfer: val?.tanggal_transfer
            ? dayjs(val?.tanggal_transfer).format("YYYY-MM-DD")
            : null,
        });
      } else {
        await BaseService.addWithdrawal({
          ...val,
          tanggal_transfer: val?.tanggal_transfer
            ? dayjs(val?.tanggal_transfer).format("YYYY-MM-DD")
            : null,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["WITHDRAWALS"] });
      toast.success("Withdrawal berhasil disimpan");
      form.resetFields();
      close();
    } catch (error) {
      errorResponse(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingId && withdrawal) {
      form.setFieldsValue({
        jumlah: withdrawal.jumlah,
        status: withdrawal.status,
        ditransfer_oleh: withdrawal.ditransfer_oleh,
        tanggal_transfer: withdrawal.tanggal_transfer
          ? dayjs(withdrawal.tanggal_transfer)
          : null,
      });
    }
  }, [existingId, withdrawal, form]);

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
          {existingId ? "Edit Withdrawal" : "Tambah Withdrawal"}
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
          label="Di Transfer Oleh"
          name="ditransfer_oleh"
          className="w-full !mb-2"
          rules={[{ required: true, message: "Nama pentransfer harus diisi" }]}
        >
          <Input placeholder="Nama" />
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
              { label: "Berhasil", value: "berhasil" },
              { label: "Pending", value: "pending" },
              { label: "Failed", value: "failed" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="tanggal_transfer"
          label="Tanggal Transfer"
          className="!mb-2 w-full"
        >
          <DatePicker
            allowClear={false}
            format="DD/MM/YYYY"
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormWithdrawal;
