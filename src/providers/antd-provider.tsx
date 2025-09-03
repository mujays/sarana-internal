"use client";
import { ConfigProvider, theme } from "antd";

function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#0B5FD8",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;
