import { LoginForm } from "@/components/LoginForm";
import { PageWrapper } from "@/components/PageWrapper";

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
