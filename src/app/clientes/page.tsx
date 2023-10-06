import { PageWrapper } from "@/components/layout/PageWrapper";
import { ClientesPage } from "@/components/clientside-pages/ClientesPage";

export default function Clientes() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section className="">
                    <ClientesPage />
                </section>
            </main>
        </PageWrapper>
    );
}
