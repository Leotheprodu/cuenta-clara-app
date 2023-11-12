"use client";
import { Input } from "@nextui-org/react";
import { useCreateInvoiceforClient } from "./useCreateInvoiceforClient";
import { PageWrapper } from "@/components/Utils/PageWrapper";
import { HeaderCreateInvoice } from "./HeaderCreateInvoice";
import { NotClientInBusiness } from "./NotClientInBusiness";
import { CreateInvoiceDetail } from "./CreateInvoiceDetail";
import { moneyFormat } from "@/components/Utils/dataFormat";

export const CreateInvoiceforClient = ({ id }: { id: string }) => {
    const {
        date,
        handleOnChange,
        username,
        businessSelected,
        createInvoiceDetail,
        total,
    } = useCreateInvoiceforClient({
        id,
    });

    if (!businessSelected.isClientInBusiness)
        return <NotClientInBusiness handle={{ username, businessSelected }} />;

    return (
        <div className="w-full flex flex-col gap-2">
            <HeaderCreateInvoice handle={{ username, businessSelected }} />
            <section className="pt-14 px-4">
                <PageWrapper>
                    <form className="w-[20rem] sm:w-full mt-20">
                        <Input
                            className="h-12 w-[10rem]"
                            labelPlacement="inside"
                            isRequired
                            variant="underlined"
                            label="Fecha"
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleOnChange}
                        />
                        <CreateInvoiceDetail handle={{ createInvoiceDetail }} />
                        <div className="bg-blanco text-secundario rounded-xl flex justify-end mt-4 ">
                            <p className="bg-gris rounded-lg p-3 shadow-md">
                                Total:{" "}
                                <span className="text-primario">
                                    {moneyFormat(total, "CRC", "es-CR")}
                                </span>
                            </p>
                        </div>
                    </form>
                </PageWrapper>
            </section>
        </div>
    );
};
