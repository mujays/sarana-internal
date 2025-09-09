import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import AntdProvider from "@/providers/antd-provider";

export const metadata: Metadata = {
  title: "Your App",
  description: "Description your app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <AntdRegistry>
            <AntdProvider>
              <NextTopLoader />
              <div>{children}</div>
              <Toaster richColors position="top-right" theme="light" />
            </AntdProvider>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
