import { PageWrapper } from "@/components/Utils/PageWrapper";
import { InvoicesByClient } from "@/components/clientside-pages/Invoices/InvoicesByClient";

export default function Invoices({ params }: { params: { id: string } }) {
  return (
    <PageWrapper>
      <main className="flex min-h-screen w-full justify-center mt-16">
        <section>
          <InvoicesByClient id={params.id} />
        </section>
      </main>
    </PageWrapper>
  );
}
