import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import { PageWrapper } from "@/components/Utils/PageWrapper";

export default function Sesion() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <LoginForm />
                </section>
            </main>
        </PageWrapper>
    );
}
