import { DeleteClientPage } from "@/components/clientside-pages/DeleteClientPage";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function DeleteClient({ params }: { params: { id: string } }) {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section className="">
                    <DeleteClientPage id={params.id} />
                </section>
            </main>
        </PageWrapper>
    );
}
