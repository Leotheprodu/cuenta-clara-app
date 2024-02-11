import { AdminPage } from "@/components/clientside-pages/Admin/AdminPage";
import { PageWrapper } from "@/components/Utils/PageWrapper";

export default function Admin() {
  return (
    <main className="flex min-h-screen justify-center items-center p-2">
      <section>
        <PageWrapper>
          <AdminPage />
        </PageWrapper>
      </section>
    </main>
  );
}
