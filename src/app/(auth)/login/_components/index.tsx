/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import errorResponse from "@/lib/error";
import { login } from "@/lib/session";
import AuthService from "@/services/auth/auth.service";
import { authStore } from "@/store/auth.store";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function LoginPage() {
  const [form] = Form.useForm();
  const { setUser } = authStore();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: any) {
    try {
      setLoading(true);
      const response = await AuthService.login(values);
      if (response.success) {
        login(response.data.token);
        setUser(response.data.user);
        toast.success("Login Berhasil");
        router.replace("/");
      }
    } catch (error: any) {
      errorResponse(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full md:max-w-[50vw] xl:max-w-[30vw] max-xl:max-w-[500px] border rounded-md p-3">
        <div className="flex justify-center pb-3">
          <span className="text-gray-800 font-bold text-xl">
            Levera Technology Group
          </span>
        </div>
        <p className="mb-3 text-center font-semibold">Sign In</p>
        <Form
          form={form}
          requiredMark={undefined}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            className="!mb-2"
            rules={[
              { required: true, message: "email harus diisi" },
              { type: "email", message: "email tidak valid" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="!mb-2"
            rules={[
              { required: true, message: "password harus diisi" },
              { min: 6, message: "password minimal 6 karakter" },
            ]}
          >
            <Input.Password placeholder="Password" type="password" />
          </Form.Item>

          <Button
            loading={loading}
            className="!mt-4 w-full"
            htmlType="submit"
            type="primary"
          >
            Masuk
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
