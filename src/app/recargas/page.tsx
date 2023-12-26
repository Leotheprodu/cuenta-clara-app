import { RechargeBalance } from "@/components/clientside-pages/Balances/RechargeBalance";
import { domain } from "@/data/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recargar Saldo",
  description: "Recarga tu saldo para poder seguir usando Yehu",
  keywords: ["recargar", "costa rica", "saldo"],
  openGraph: {
    title: "Recargar Saldo",
    description: "Recarga tu saldo para poder seguir usando Yehu",
    url: `${domain}/recargas`,
  },
};
export default function Balances() {
  return (
    <main className="flex min-h-screen w-full justify-center mt-16">
      <section>
        <RechargeBalance />
      </section>
    </main>
  );
}
