import { PageWrapper } from "@/components/Utils/PageWrapper";
import { Clients } from "@/components/clientside-pages/Clients/Clients";

export default function Clientes() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen w-full pt-6">
                <section>
                    <Clients />
                </section>
            </main>
        </PageWrapper>
    );
}
