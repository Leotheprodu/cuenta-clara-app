import { PageWrapper } from "@/components/Utils/PageWrapper";
import { ClientSideDashboard } from "@/components/clientside-pages/ClientSideDashboard/ClientSideDashboard";

export default function ClientDashboard({
  params,
}: {
  params: { token: string };
}) {
  return (
    <PageWrapper>
      <main className="flex min-h-screen justify-center items-center mt-16 p-2">
        <section className="">
          <ClientSideDashboard token={params.token} />
        </section>
      </main>
    </PageWrapper>
  );
}
