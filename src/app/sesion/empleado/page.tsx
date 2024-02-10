import { PageWrapper } from "@/components/Utils/PageWrapper";
import { LoginEmployee } from "@/components/clientside-pages/LoginEmployee/LoginEmployee";

export default function Employee() {
  return (
    <main className="flex min-h-screen justify-center items-center mt-16 p-2">
      <section>
        <PageWrapper>
          <LoginEmployee />
        </PageWrapper>
      </section>
    </main>
  );
}
