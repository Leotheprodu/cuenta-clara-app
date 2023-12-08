import { DeactivateClient } from "@/components/clientside-pages/DeactivateClient/DeactivateClient";
import { PageWrapper } from "@/components/Utils/PageWrapper";

export default function DeactivateClientPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PageWrapper>
      <main className="flex min-h-screen justify-center items-center mt-16 p-2">
        <section className="">
          <DeactivateClient id={params.id} />
        </section>
      </main>
    </PageWrapper>
  );
}
