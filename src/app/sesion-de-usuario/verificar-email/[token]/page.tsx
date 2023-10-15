import { EmailVerification } from "@/components/clientside-pages/VerifyEmail/EmailVerification";

import { PageWrapper } from "@/components/layout/PageWrapper";

export default function VerifyEmail({ params }: { params: { token: string } }) {
    return (
        <PageWrapper>
            <main className="flex min-h-screen justify-center items-center p-2">
                <section>
                    <EmailVerification token={params.token} />
                </section>
            </main>
        </PageWrapper>
    );
}
