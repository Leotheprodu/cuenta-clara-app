import { PageWrapper } from "@/components/layout/PageWrapper";
import { ClientsPage } from "@/components/clientside-pages/ClientsPage/ClientsPage";

export default function Clientes() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center">
                <section className="">
                    <ClientsPage />
                </section>
            </main>
        </PageWrapper>
    );
}
