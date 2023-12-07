import "./index.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header/Header";
import { appDescription, appName, domain } from "@/data/constants";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${appName}`,
    default: `${appName}`,
  },
  description: `${appDescription}`,
  keywords: ["dinero", "costa rica", "manejo de dinero"],
  openGraph: {
    title: `${appName}`,
    description: `${appDescription}`,
    url: `${domain}`,
    siteName: `${appName}`,
    images: [
      {
        url: "/yehu.jpg",
        width: 1200,
        height: 628,
        alt: "yehu imagen",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  /* twitter: {
    card: 'summary_large_image',
    title: `${appName}`,
    description: `${appDescription}`,
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'],
  }, */
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <Providers>
          <Toaster />
          <Header />
          {children}
          {/*  <div className="overflow-y-auto mb-16 mt-16 pb-4"></div> */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
