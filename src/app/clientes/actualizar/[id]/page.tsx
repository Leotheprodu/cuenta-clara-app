import { UpdateClient } from "@/components/forms/UpdateClient";
import { PageWrapper } from "@/components/layout/PageWrapper";
export default function ActualizarCliente({
    params,
}: {
    params: { id: string };
}) {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <UpdateClient id={params.id} />
                </section>
            </main>
        </PageWrapper>
    );
}
