import { EmailVerification } from "@/components/clientside-pages/VerifyEmail/EmailVerification";

import { PageWrapper } from "@/components/Utils/PageWrapper";

export default function VerifyEmail({ params }: { params: { token: string } }) {
  return (
    <PageWrapper>
      <main className="flex min-h-screen justify-center items-center mt-16 p-2">
        <section>
          <EmailVerification token={params.token} />
        </section>
      </main>
    </PageWrapper>
  );
}
