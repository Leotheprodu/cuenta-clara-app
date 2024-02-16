import { PageWrapper } from "@/components/Utils/PageWrapper";
import { CatalogPage } from "@/components/clientside-pages/Admin/catalogPage/CatalogPage";

export default function Catalog() {
  return (
    <main className="flex min-h-screen p-10 sm:px-20">
      <section>
        <PageWrapper>
          <CatalogPage />
        </PageWrapper>
      </section>
    </main>
  );
}
