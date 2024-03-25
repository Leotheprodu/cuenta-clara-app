import { PageWrapper } from "@/components/Utils/PageWrapper";
import { PaymentMethodsAdminPage } from "@/components/clientside-pages/Admin/PaymentMethodsAdminPage/PaymentMethodsAdminPage";

export default function PaymentMethods() {
  return (
    <main className="flex min-h-screen w-full justify-center mt-16">
      <section>
        <PageWrapper>
          <PaymentMethodsAdminPage />
        </PageWrapper>
      </section>
    </main>
  );
}
