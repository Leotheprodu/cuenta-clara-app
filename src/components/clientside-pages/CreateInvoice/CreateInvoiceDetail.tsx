import {
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea,
} from "@nextui-org/react";

export const CreateInvoiceDetail = ({ handle }: CreateInvoiceDetailProps) => {
    const {
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
    } = handle;
    return (
        <div>
            <h2 className="text-2xl text-center font-bold my-10">
                Detalles de la Factura
            </h2>
            <Button
                color="primary"
                className="w-full mb-10 uppercase"
                onPress={() => handleOpenAddDetail()}
            >
                Agregar detalle de Factura
            </Button>
            <Modal
                backdrop="blur"
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
                                    <Input
                                        className="h-12"
                                        ref={codeInput}
                                        variant="underlined"
                                        label="Codigo"
                                        type="text"
                                        name="code"
                                        value={formDataDetail.code}
                                        autoFocus
                                        onChange={handleOnChangeDetail}
                                        tabIndex={1}
                                    />
                                    <Input
                                        className="h-12"
                                        isRequired
                                        variant="underlined"
                                        label="Cantidad"
                                        type="number"
                                        inputMode="numeric"
                                        name="quantity"
                                        value={
                                            formDataDetail.quantity === 0
                                                ? ""
                                                : formDataDetail.quantity.toString()
                                        }
                                        onChange={handleOnChangeDetail}
                                        tabIndex={2}
                                    />
                                    <Input
                                        className="h-12"
                                        isRequired
                                        variant="underlined"
                                        label="Precio"
                                        inputMode="numeric"
                                        type="text"
                                        name="price"
                                        value={
                                            formDataDetail.price === 0
                                                ? ""
                                                : formDataDetail.price.toString()
                                        }
                                        onChange={handleOnChangeDetail}
                                        tabIndex={3}
                                    />
                                    <Textarea
                                        className=""
                                        isRequired
                                        variant="underlined"
                                        label="Descripcion"
                                        name="description"
                                        value={formDataDetail.description}
                                        onChange={handleOnChangeDetail}
                                        tabIndex={4}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => handleCloseModal(onClose)}
                                    tabIndex={-1}
                                >
                                    Close
                                </Button>
                                <Button
                                    type="button"
                                    onPress={() =>
                                        handleAddInvoiceDetail(onClose)
                                    }
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

            <Table aria-label="Detalle de Factura">
                <TableHeader>
                    {columnNames.map(
                        (column: { key: string; name: string }) => (
                            <TableColumn key={column.key}>
                                {column.name}
                            </TableColumn>
                        )
                    )}
                </TableHeader>
                <TableBody emptyContent={"No hay detalles para mostrar"}>
                    {invoiceDetails.map(
                        (
                            row: InitialStateInvoiceDetailProps,
                            index: number
                        ) => (
                            <TableRow key={index}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(row, columnKey, index)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
