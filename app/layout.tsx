import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://luna20190312.github.io/luna-learns-python/",
  ),
  title: "Luna Learns Python｜贝琪的代码实验室",
  description:
    "为孩子设计的原生 Python 互动课程：在浏览器中观察、修改并运行真正的 Python 代码。",
  openGraph: {
    title: "Luna Learns Python",
    description:
      "为孩子设计的原生 Python 互动课程，在浏览器里观察、修改并运行真正的代码。",
    type: "website",
    images: [
      {
        url: "https://luna20190312.github.io/luna-learns-python/og.png",
        width: 1731,
        height: 909,
        alt: "Luna Learns Python interactive course",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luna Learns Python",
    description: "Interactive Python Course · by Joenix",
    images: [
      "https://luna20190312.github.io/luna-learns-python/og.png",
    ],
  },
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
