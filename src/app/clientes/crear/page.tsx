import { NewClient } from "@/components/forms/NewClient/NewClient";
import { PageWrapper } from "@/components/layout/PageWrapper";
export default function NuevoCliente() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <NewClient />
                </section>
            </main>
        </PageWrapper>
    );
}
