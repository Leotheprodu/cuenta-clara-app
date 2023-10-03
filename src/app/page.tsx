import { MainPage } from "./client/MainPage";

export default async function Home() {
    return (
        <main className="flex min-h-screen justify-center items-center p-2">
            <section>
                <MainPage />
            </section>
        </main>
    );
}
