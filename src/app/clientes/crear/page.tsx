import { CreateClient } from "@/components/clientside-pages/CreateClient/CreateClient";
import { PageWrapper } from "@/components/Utils/PageWrapper";
export default function NuevoCliente() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <CreateClient />
                </section>
            </main>
        </PageWrapper>
    );
}
