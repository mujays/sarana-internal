/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { APP_TYPE } from "@/constant";
import errorResponse from "@/lib/error";
import BaseService from "@/services/base/base.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Skeleton } from "antd";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FormApp({ existingId }: { existingId?: number | null }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const jenis = Form.useWatch("jenis", form);

  const queryClient = useQueryClient();

  const { data: app, isLoading } = useQuery({
    queryKey: ["APP", existingId],
    enabled: !!existingId,
    queryFn: async () => {
      const response = await BaseService.getOneApp(existingId!);
      return response;
    },
  });

  const onSubmit = async (val: any) => {
    try {
      setLoading(true);

      const withTrx = [
        APP_TYPE.ECOMMERCE,
        APP_TYPE.ENTERPRISE,
        APP_TYPE.B2B,
      ].includes(jenis);

      const withPlan = [APP_TYPE.SAAS, APP_TYPE.ENTERPRISE].includes(jenis);

      if (!existingId) {
        await BaseService.addApp({
          kode: val?.kode,
          name: val?.name,
          jenis: val?.jenis,
          deskripsi: val?.deskripsi,
          plan: withPlan
            ? [
                {
                  name: val?.planName,
                  description: val?.planDescription,
                  harga: val?.planHarga,
                  duration: val?.planDuration,
                  duration_finance: val?.planDurationFinance,
                },
              ]
            : undefined,
          transaction_fee: withTrx
            ? {
                type_per_transaction: val?.type_per_transaction,
                fee_per_transaction: +val?.fee_per_transaction,
                type_per_withdrawal: val?.type_per_withdrawal,
                fee_per_withdrawal: +val?.fee_per_withdrawal,
                type_per_layanan: val?.type_per_layanan,
                biaya_layanan: +val?.biaya_layanan,
              }
            : undefined,
        });
      } else {
        // await BaseService.updateApp(val);
      }

      queryClient.invalidateQueries({
        queryKey: ["PLANS"],
      });

      toast.success("App berhasil dibuat");
      router.push("/app");
      form.resetFields();
    } catch (error) {
      errorResponse(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingId && app) {
      form.setFieldsValue({
        name: app.data.name,
        description: app.data?.deskripsi || "",
      });
    }
  }, [existingId, app]);

  return (
    <Form
      form={form}
      requiredMark
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
            <Form.Item
              label="Kode"
              name="kode"
              className="w-full !mb-2"
              rules={[{ required: true, message: "Kode harus diisi" }]}
            >
              <Input placeholder="Kode" />
            </Form.Item>
            <Form.Item
              label="Nama Proyek"
              name="name"
              className="w-full !mb-2"
              rules={[{ required: true, message: "Nama Proyek harus diisi" }]}
            >
              <Input placeholder="Nama" />
            </Form.Item>
            <Form.Item
              label="Deskripsi"
              name="deskripsi"
              className="w-full !mb-2"
            >
              <Input.TextArea placeholder="Deskripsi" />
            </Form.Item>

            <Form.Item
              name="jenis"
              label="Jenis"
              className="!mb-2 w-full"
              rules={[{ required: true, message: "Jenis harus diisi" }]}
            >
              <Select
                placeholder="Pilih Jenis"
                options={[
                  {
                    label: APP_TYPE.B2B,
                    value: APP_TYPE.B2B,
                  },
                  {
                    label: APP_TYPE.SAAS,
                    value: APP_TYPE.SAAS,
                  },
                  {
                    label: APP_TYPE.ECOMMERCE,
                    value: APP_TYPE.ECOMMERCE,
                  },
                  {
                    label: APP_TYPE.ENTERPRISE,
                    value: APP_TYPE.ENTERPRISE,
                  },
                ]}
              />
            </Form.Item>
          </div>
          {[APP_TYPE.SAAS, APP_TYPE.ENTERPRISE].includes(jenis) && (
            <div className="mt-4 border rounded-lg p-4 space-y-3">
              <p className="font-semibold text-xl">Rancangan</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                <Form.Item
                  label="Nama"
                  name="planName"
                  className="w-full !mb-2"
                  rules={[{ required: true, message: "Nama Plan harus diisi" }]}
                >
                  <Input placeholder="Nama" />
                </Form.Item>

                <Form.Item
                  label="Durasi Proyek (Hari)"
                  name="planDuration"
                  className="w-full !mb-2"
                  rules={[{ required: true, message: "Durasi harus diisi" }]}
                >
                  <Input
                    className="!w-full"
                    min={0}
                    placeholder="Masukkan durasi"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ planDuration: value });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Durasi Keuangan"
                  name="planDurationFinance"
                  className="w-full !mb-2"
                  rules={[
                    { required: true, message: "Durasi keuangan harus diisi" },
                  ]}
                >
                  <Input
                    className="!w-full"
                    min={0}
                    placeholder="Masukkan durasi"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ planDurationFinance: value });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Deskripsi"
                  name="planDescription"
                  className="w-full !mb-2"
                  rules={[{ required: true, message: "Deskripsi harus diisi" }]}
                >
                  <Input.TextArea placeholder="Deskripsi" />
                </Form.Item>
                <Form.Item
                  label="Harga"
                  name="planHarga"
                  className="w-full !mb-2"
                  rules={[{ required: true, message: "Harga harus diisi" }]}
                >
                  <Input
                    className="!w-full"
                    min={0}
                    placeholder="Masukkan harga"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ harga: value });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          )}

          {[APP_TYPE.ECOMMERCE, APP_TYPE.ENTERPRISE, APP_TYPE.B2B].includes(
            jenis
          ) && (
            <div className="mt-4 border rounded-lg p-4 space-y-3">
              <p className="font-semibold text-xl">Atur Transaksi</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                <Form.Item
                  name="type_per_transaction"
                  label="Tipe Transaksi"
                  className="!mb-2 w-full"
                  rules={[
                    { required: true, message: "Tipe transaksi harus diisi" },
                  ]}
                >
                  <Select
                    placeholder="Pilih Tipe"
                    options={[
                      { label: "Nominal", value: "nominal" },
                      { label: "Percentage", value: "percentage" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Fee Transaksi"
                  name="fee_per_transaction"
                  className="w-full !mb-2"
                  rules={[
                    { required: true, message: "Fee transaksi harus diisi" },
                  ]}
                >
                  <Input
                    className="!w-full"
                    min={0}
                    placeholder="Masukkan Fee"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ fee_per_transaction: value });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="type_per_withdrawal"
                  label="Tipe Withdrawal"
                  className="!mb-2 w-full"
                  rules={[
                    { required: true, message: "Tipe withdrawal harus diisi" },
                  ]}
                >
                  <Select
                    placeholder="Pilih Tipe"
                    options={[
                      { label: "Nominal", value: "nominal" },
                      { label: "Percentage", value: "percentage" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Fee Withdrawal"
                  name="fee_per_withdrawal"
                  className="w-full !mb-2"
                  rules={[
                    { required: true, message: "Fee withdrawal harus diisi" },
                  ]}
                >
                  <Input
                    className="!w-full"
                    min={0}
                    placeholder="Masukkan Fee"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ fee_per_withdrawal: value });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="type_per_layanan"
                  label="Tipe Layanan"
                  className="!mb-2 w-full"
                  rules={[
                    { required: true, message: "Tipe layanan harus diisi" },
                  ]}
                >
                  <Select
                    placeholder="Pilih Tipe"
                    options={[
                      { label: "Nominal", value: "nominal" },
                      { label: "Percentage", value: "percentage" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Fee Layanan"
                  name="biaya_layanan"
                  className="w-full !mb-2"
                  rules={[
                    { required: true, message: "Fee layanan harus diisi" },
                  ]}
                >
                  <Input
                    className="!w-full"
                    min={0}
                    placeholder="Masukkan Fee"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ biaya_layanan: value });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-5">
            <Button loading={loading} htmlType="submit" type="primary">
              Simpan
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

export default FormApp;
