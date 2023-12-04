import { PageWrapper } from "@/components/Utils/PageWrapper";
import { appName } from "@/data/constants";

export default function Home() {
  return (
    <PageWrapper>
      <main className="flex min-h-screen justify-center items-center p-2">
        <section>
          <h1>Bievenido a {appName}</h1>
        </section>
      </main>
    </PageWrapper>
  );
}
