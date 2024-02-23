import { PageWrapper } from "@/components/Utils/PageWrapper";
import { CatalogPage } from "@/components/clientside-pages/Admin/catalogPage/CatalogPage";

export default function Catalog() {
  return (
    <main className="flex min-h-screen w-full justify-center mt-16">
      <section>
        <PageWrapper>
          <CatalogPage />
        </PageWrapper>
      </section>
    </main>
  );
}
