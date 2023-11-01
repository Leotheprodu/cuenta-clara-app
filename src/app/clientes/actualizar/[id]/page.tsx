import { UpdateClientPage } from "@/components/clientside-pages/UpdateClientPage/UpdateClientPage";
import { PageWrapper } from "@/components/Utils/PageWrapper";
export default function ActualizarCliente({
    params,
}: {
    params: { id: string };
}) {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <UpdateClientPage id={params.id} />
                </section>
            </main>
        </PageWrapper>
    );
}
