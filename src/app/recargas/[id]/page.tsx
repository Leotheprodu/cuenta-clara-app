import { formatNumber, moneyFormat } from "@/components/Utils/dataFormat";
import { RechargingBalance } from "@/components/clientside-pages/Balances/RechargingBalance";
import { baseUrl, domain } from "@/data/constants";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};
async function getData(id: string) {
  const res = await fetch(`${baseUrl}balances/types/balance/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const { data } = await getData(id);

  return {
    title: `${data.name}`,
    description: `Recarga de ${data.name} en tu cuenta de Yehu`,
    keywords: ["recargar", "costa rica", "saldo", `${data.name}`],
    openGraph: {
      title: `${data.name}`,
      description: `Recarga de ${data.name} en tu cuenta de Yehu`,
      url: `${domain}/recargas/${id}`,
    },
  };
}
export default async function BalanceType({
  params,
}: {
  params: { id: string };
}) {
  const { data }: { data: BalanceTypes } = await getData(params.id);
  return (
    <main className=" w-full mt-24">
      <section className="flex flex-col items-center justify-center p-4 ">
        <h1 className="text-2xl text-center">{data.name}</h1>
        <p>Sigue los siguientes pasos para realizar la recarga:</p>
      </section>
      <section>
        <RechargingBalance balanceType={data} />
      </section>
    </main>
  );
}
