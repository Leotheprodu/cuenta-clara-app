import { Clients } from "@/components/clientside-pages/Clients/Clients";
import { domain } from "@/data/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Todos los clientes de tu empresa en Yehu",
  keywords: ["dinero", "costa rica", "clientes"],
  openGraph: {
    title: "Clientes",
    description: "Todos los clientes de tu empresa en Yehu",
    url: `${domain}/clientes`,
  },
};
export default function Clientes() {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <section>
        <Clients />
      </section>
    </main>
  );
}
