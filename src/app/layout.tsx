import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/footer/Footer";
import { GlobalToast } from "@/components/layout/GlobalToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cuenta Clara",
    description:
        "Cuenta Clara, controla las cuentas con los clientes de tu negocio",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <GlobalToast />
                <Providers>{children}</Providers>
                <Footer />
            </body>
        </html>
    );
}
