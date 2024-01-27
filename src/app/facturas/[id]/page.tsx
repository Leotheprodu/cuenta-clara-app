import { InvoicesByClient } from "@/components/clientside-pages/Invoices/InvoicesByClient";

export default function Invoices({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen w-full justify-center mt-16">
      <section>
        <InvoicesByClient id={params.id} />
      </section>
    </main>
  );
}
