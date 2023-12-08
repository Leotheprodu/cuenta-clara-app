import { PageWrapper } from "@/components/Utils/PageWrapper";
import { CreateInvoiceforClient } from "@/components/clientside-pages/CreateInvoice/CreateInvoiceforClient";

export default function CreateInvoice({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen w-full justify-center mt-16">
      <section>
        <CreateInvoiceforClient id={params.id} />
      </section>
    </main>
  );
}
