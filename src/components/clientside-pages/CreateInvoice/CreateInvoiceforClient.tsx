"use client";
import { Input } from "@nextui-org/react";
import { useCreateInvoiceforClient } from "./useCreateInvoiceforClient";
import { PageWrapper } from "@/components/Utils/PageWrapper";
import { HeaderCreateInvoice } from "./HeaderCreateInvoice";
import { NotClientInBusiness } from "./NotClientInBusiness";
import { CreateInvoiceDetail } from "./CreateInvoiceDetail";

export const CreateInvoiceforClient = ({ id }: { id: string }) => {
    const {
        date,
        handleOnChange,
        username,
        businessSelected,
        formDataDetail,
        handleOnChangeDetail,
        handleAddInvoiceDetail,
        invoiceDetails,
        handleOpenAddDetail,
        isOpen,
        onOpenChange,
        codeInput,
        renderCell,
        columnNames,
        handleCloseModal,
    } = useCreateInvoiceforClient({
        id,
    });

    if (!businessSelected.isClientInBusiness)
        return <NotClientInBusiness handle={{ username, businessSelected }} />;

    return (
        <div className="w-full flex flex-col gap-2">
            <HeaderCreateInvoice handle={{ username, businessSelected }} />
            <section className="pt-14 w-full">
                <PageWrapper>
                    <form>
                        <Input
                            className="h-12"
                            labelPlacement="outside-left"
                            isRequired
                            variant="underlined"
                            label="Fecha"
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleOnChange}
                        />
                        <CreateInvoiceDetail
                            handle={{
                                handleOnChangeDetail,
                                formDataDetail,
                                handleAddInvoiceDetail,
                                invoiceDetails,
                                handleOpenAddDetail,
                                isOpen,
                                onOpenChange,
                                codeInput,
                                renderCell,
                                columnNames,
                                handleCloseModal,
                            }}
                        />
                    </form>
                </PageWrapper>
            </section>
        </div>
    );
};
