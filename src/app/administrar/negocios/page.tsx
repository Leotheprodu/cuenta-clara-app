import { PageWrapper } from "@/components/Utils/PageWrapper";
import { BusinessesPage } from "@/components/clientside-pages/Admin/BusinessesPage/BusinessesPage";

export default function Businesses() {
  return (
    <main className="flex min-h-screen w-full justify-center mt-16">
      <section>
        <PageWrapper>
          <BusinessesPage />
        </PageWrapper>
      </section>
    </main>
  );
}
