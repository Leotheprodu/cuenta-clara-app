import { PageWrapper } from "@/components/layout/PageWrapper";
import { Clients } from "@/components/clientside-pages/Clients/Clients";

export default function Clientes() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center">
                <section className="">
                    <Clients />
                </section>
            </main>
        </PageWrapper>
    );
}
