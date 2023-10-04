import { LoginForm } from "@/components/forms/LoginForm";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function Login() {
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
