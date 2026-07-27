import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luna Learns Python｜贝琪的代码实验室",
  description:
    "为孩子设计的原生 Python 互动课程：在浏览器中观察、修改并运行真正的 Python 代码。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
