import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { PageWrapper } from "@/components/PageWrapper";

export default function App() {
    return (
        <PageWrapper>
            <div className=" flex items-center justify-center h-[30rem]">
                <Spinner
                    size="lg"
                    color="success"
                    label="Cargando"
                    labelColor="primary"
                    className="my-0 mx-auto"
                />
            </div>
        </PageWrapper>
    );
}
