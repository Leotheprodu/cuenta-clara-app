"use client";
import { Button, Input } from "@nextui-org/react";
import { useCreateInvoiceforClient } from "./useCreateInvoiceforClient";
import { PageWrapper } from "@/components/Utils/PageWrapper";
import { HeaderCreateInvoice } from "./HeaderCreateInvoice";
import { NotClientInBusiness } from "./NotClientInBusiness";
import { CreateInvoiceDetail } from "./CreateInvoiceDetail";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { AddIcon } from "@/icons/AddIcon";
import { AddInvoiceIcon } from "@/icons/AddInvoiceIcon";

export const CreateInvoiceforClient = ({ id }: { id: string }) => {
    const {
        date,
        handleOnChange,
        username,
        businessSelected,
        createInvoiceDetail,
        total,
        handleCreateInvoice,
    } = useCreateInvoiceforClient({
        id,
    });
    const { handleOpenAddDetail } = createInvoiceDetail;
    if (!businessSelected.isClientInBusiness)
        return <NotClientInBusiness handle={{ username, businessSelected }} />;

    return (
        <div className="w-full flex flex-col gap-2">
            <HeaderCreateInvoice handle={{ username, businessSelected }} />
            <section className="pt-14 px-4">
                <PageWrapper>
                    <form
                        onSubmit={handleCreateInvoice}
                        className="w-[20rem] sm:w-full mt-20 bg-gris/30 p-4 rounded-xl shadow-md"
                    >
                        <h2 className="text-2xl text-center font-bold my-2">
                            Crear Factura
                        </h2>
                        <div className="flex gap-4 mb-4 items-center">
                            <Input
                                className="w-[10rem]"
                                labelPlacement="inside"
                                isRequired
                                variant="underlined"
                                type="date"
                                name="date"
                                value={date}
                                onChange={handleOnChange}
                            />
                            <Button
                                color="secondary"
                                variant="light"
                                className=" uppercase"
                                onPress={() => handleOpenAddDetail()}
                                startContent={<AddIcon className="" />}
                            >
                                Agregar detalle
                            </Button>
                        </div>
                        <CreateInvoiceDetail handle={{ createInvoiceDetail }} />
                        <div className=" text-secundario rounded-xl flex justify-end mt-4 ">
                            <p className="bg-gris rounded-lg p-3 shadow-md">
                                Total:{" "}
                                <span className="text-primario">
                                    {moneyFormat(total, "CRC", "es-CR")}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-end mt-8 gap-4">
                            <Button
                                color="primary"
                                variant="light"
                                className="uppercase"
                                type="submit"
                            >
                                {" "}
                                Crear Factura
                            </Button>
                        </div>
                    </form>
                </PageWrapper>
            </section>
        </div>
    );
};
