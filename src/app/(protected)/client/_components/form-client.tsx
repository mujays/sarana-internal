/* eslint-disable @typescript-eslint/no-explicit-any */
import errorResponse from "@/lib/error";
import BaseService from "@/services/base/base.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FormClient({
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

  const { data: client, isLoading } = useQuery({
    queryKey: ["CLIENT", existingId],
    enabled: !!existingId,
    queryFn: async () => {
      const response = await BaseService.getOneClient(existingId!);
      return response;
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);
      if (existingId) {
        await BaseService.updateClient(existingId, val);
      } else {
        await BaseService.addClient(val);
      }
      queryClient.invalidateQueries({
        queryKey: ["CLIENTS"],
      });
      toast.success("Client berhasil disimpan");
      form.resetFields();
      close();
    } catch (error) {
      errorResponse(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingId && client) {
      form.setFieldsValue({
        nama: client.data.nama,
        email: client.data.email,
        type: client.data.type,
        no_telp_pic: client.data.no_telp_pic,
        pic: client.data.pic,
        email_pic: client.data.email_pic,
      });
    }
  }, [existingId, client, form]);

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
          {existingId ? "Edit Client" : "Tambah Client"}
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
          label="Nama Client"
          name="nama"
          className="w-full !mb-2"
          rules={[{ required: true, message: "Nama Client harus diisi" }]}
        >
          <Input placeholder="Nama" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          className="w-full !mb-2"
          rules={[{ required: true, message: "Email harus diisi" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          className="!mb-2 w-full"
          rules={[{ required: true, message: "Type harus diisi" }]}
        >
          <Select
            placeholder="Pilih Type"
            options={[
              { label: "Owned", value: "Owned" },
              { label: "Managed", value: "Managed" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="No. Telp PIC"
          name="no_telp_pic"
          className="w-full !mb-2"
          rules={[{ required: true, message: "No. Telp PIC harus diisi" }]}
        >
          <Input placeholder="No. Telp PIC" />
        </Form.Item>
        <Form.Item
          label="PIC"
          name="pic"
          className="w-full !mb-2"
          rules={[{ required: true, message: "PIC harus diisi" }]}
        >
          <Input placeholder="PIC" />
        </Form.Item>
        <Form.Item
          label="Email PIC"
          name="email_pic"
          className="w-full !mb-2"
          rules={[{ required: true, message: "Email PIC harus diisi" }]}
        >
          <Input placeholder="Email PIC" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormClient;
