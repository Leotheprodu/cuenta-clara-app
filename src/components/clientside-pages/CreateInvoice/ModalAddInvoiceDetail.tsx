import { AddIcon } from "@/icons/AddIcon";
import {
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea,
    Tooltip,
} from "@nextui-org/react";
import { ModalSearchProductsAndServices } from "./ModalSearchProductsAndServices";

export const ModalAddInvoiceDetail = ({ handle }: CreateInvoiceDetailProps) => {
    const { createInvoiceDetail } = handle;
    const {
        formDataDetail,
        handleOnChangeDetail,
        handleAddInvoiceDetail,
        isOpen,
        onOpenChange,
        codeInput,
        handleCloseModal,
        handleOnBlurCode,
        handleEraseModal,
        handleOpenSearchPS,
        handleFocus,
        quantityInput,
    } = createInvoiceDetail;
    return (
        <Modal
            backdrop="opaque"
            placement="center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Agregue detalles a la factura
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col px-10 justify-center items-center gap-2 mt-4">
                                <div className="flex gap-2 w-full relative">
                                    <Tooltip content="Buscar">
                                        <button
                                            onClick={() => handleOpenSearchPS()}
                                            name="buscar"
                                            className="absolute left-[-2rem] bottom-1 bg-secundario/20 rounded-md text-blanco hover:bg-secundario duration-300"
                                        >
                                            <AddIcon />
                                        </button>
                                    </Tooltip>
                                    <ModalSearchProductsAndServices
                                        handle={{
                                            createInvoiceDetail,
                                        }}
                                    />
                                    <Input
                                        className="h-12"
                                        ref={codeInput}
                                        variant="underlined"
                                        label="Codigo"
                                        type="text"
                                        name="code"
                                        value={formDataDetail.code}
                                        autoFocus
                                        isRequired
                                        onChange={handleOnChangeDetail}
                                        onBlur={handleOnBlurCode}
                                        onFocus={handleFocus}
                                        tabIndex={1}
                                    />
                                </div>
                                <Input
                                    className="h-12"
                                    ref={quantityInput}
                                    isRequired
                                    variant="underlined"
                                    label="Cantidad"
                                    type="number"
                                    inputMode="numeric"
                                    step={0.01}
                                    name="quantity"
                                    value={
                                        formDataDetail.quantity === 0
                                            ? ""
                                            : formDataDetail.quantity.toString()
                                    }
                                    onChange={handleOnChangeDetail}
                                    onFocus={handleFocus}
                                    tabIndex={2}
                                />
                                <Textarea
                                    className=""
                                    isRequired
                                    variant="underlined"
                                    label="Descripcion"
                                    name="description"
                                    value={formDataDetail.description}
                                    onChange={handleOnChangeDetail}
                                    onFocus={handleFocus}
                                    tabIndex={4}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={handleEraseModal}
                                tabIndex={-1}
                            >
                                Borrar
                            </Button>
                            <Button
                                color="warning"
                                variant="light"
                                onPress={() => handleCloseModal(onClose)}
                                tabIndex={-1}
                            >
                                Cerrar
                            </Button>
                            <Button
                                type="button"
                                onPress={() => handleAddInvoiceDetail(onClose)}
                                color="primary"
                                tabIndex={5}
                            >
                                Agregar Detalle
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
