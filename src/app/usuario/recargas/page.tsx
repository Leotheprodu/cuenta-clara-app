import { Clients } from "@/components/clientside-pages/Clients/Clients";
import { domain } from "@/data/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recargas",
  description: "Recarga tu cuenta en Yehu",
  keywords: ["dinero", "costa rica", "usuario", "recargas", "recarga"],
  openGraph: {
    title: "Recarga tu cuenta",
    description: "Recarga tu cuenta en Yehu",
    url: `${domain}/usuario/recargas`,
  },
};
export default function Recargas() {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <section>
        <h1>Recargas</h1>
      </section>
    </main>
  );
}
