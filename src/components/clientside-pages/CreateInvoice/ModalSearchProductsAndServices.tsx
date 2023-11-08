import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
export const ModalSearchProductsAndServices = ({ handle }: any) => {
    const { createInvoiceDetail } = handle;
    const {
        isOpenModalPS,
        onOpenChangeModalPS,
        handleCloseModalPS,
        handleAddPStoDetail,
    } = createInvoiceDetail;
    return (
        <Modal
            backdrop="blur"
            placement="center"
            isOpen={isOpenModalPS}
            onOpenChange={onOpenChangeModalPS}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Agregar Producto o Servicio
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col px-10 justify-center items-center gap-2 mt-4">
                                <p>prueba</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="warning"
                                variant="light"
                                onPress={() => handleCloseModalPS(onClose)}
                                tabIndex={-1}
                            >
                                Cerrar
                            </Button>
                            <Button
                                type="button"
                                onPress={() => handleAddPStoDetail(onClose)}
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
