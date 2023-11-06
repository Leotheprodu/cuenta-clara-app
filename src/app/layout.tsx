import "./index.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header/Header";
import { appDescription, appName } from "@/data/constants";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: `${appName}`,
    description: `${appDescription}`,
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
                    <div className="overflow-y-auto mb-16 mt-16 pb-4">
                        {children}
                    </div>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
