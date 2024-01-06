import { PageWrapper } from "@/components/Utils/PageWrapper";
import { BalanceRechargesByClient } from "@/components/clientside-pages/BalanceRechargesByClient/BalanceRechargesByClient";

export default function ClientRecharges({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PageWrapper>
      <main className="flex min-h-screen w-full justify-center mt-16">
        <section>
          <BalanceRechargesByClient id={parseInt(params.id)} />
        </section>
      </main>
    </PageWrapper>
  );
}
