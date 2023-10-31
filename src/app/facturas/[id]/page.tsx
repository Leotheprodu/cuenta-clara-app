import { PageWrapper } from "@/components/Utils/PageWrapper";
import { ShowInvoices } from "@/components/clientside-pages/Invoices/ShowInvoices";

export default function Invoices({ params }: { params: { id: string } }) {
    return (
        <PageWrapper>
            <main className="flex min-h-screen w-full justify-center">
                <section>
                    <ShowInvoices id={params.id} />
                </section>
            </main>
        </PageWrapper>
    );
}
