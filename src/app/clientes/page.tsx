import { PageWrapper } from "@/components/Utils/PageWrapper";
import { Clients } from "@/components/clientside-pages/Clients/Clients";

export default function Clientes() {
    return (
        <main className="flex min-h-screen w-full justify-center">
            <section>
                <Clients />
            </section>
        </main>
    );
}
