import { PageWrapper } from "@/components/Utils/PageWrapper";
import { SignUpForm } from "@/components/forms/SignUp/SignUpForm";

export default function Sesion() {
  return (
    <PageWrapper>
      <main className="flex min-h-screen justify-center items-center mt-16 p-2">
        <section>
          <SignUpForm />
        </section>
      </main>
    </PageWrapper>
  );
}
