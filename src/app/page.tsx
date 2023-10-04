import { PageWrapper } from "@/components/layout/PageWrapper";
import { MainPage } from "@/components/clientside-pages/MainPage";

export default function Home() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <MainPage />
                </section>
            </main>
        </PageWrapper>
    );
}
