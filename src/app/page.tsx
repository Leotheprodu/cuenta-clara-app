import { PageWrapper } from "@/components/PageWrapper";
import { MainPage } from "../components/client/MainPage";

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
