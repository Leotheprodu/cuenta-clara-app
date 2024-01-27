import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import { PageWrapper } from "@/components/Utils/PageWrapper";

export default function Sesion() {
  return (
    <main className="flex min-h-screen justify-center items-center mt-16 p-2">
      <section>
        <PageWrapper>
          <LoginForm />
        </PageWrapper>
      </section>
    </main>
  );
}
