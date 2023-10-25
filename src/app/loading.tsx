import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { PageWrapper } from "@/components/Utils/PageWrapper";

export default function Loading({ label = "Cargando" }: { label?: string }) {
    return (
        <PageWrapper>
            <div className=" flex items-center justify-center h-[30rem]">
                <Spinner
                    size="lg"
                    color="success"
                    label={`${label}`}
                    labelColor="primary"
                    className="my-0 mx-auto"
                />
            </div>
        </PageWrapper>
    );
}
