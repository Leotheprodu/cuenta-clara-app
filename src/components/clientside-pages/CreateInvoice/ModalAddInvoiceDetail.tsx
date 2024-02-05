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
import { moneyFormat } from "@/components/Utils/dataFormat";
import { SearchIcon } from "@/icons/SearchIcon";

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
                <div className="flex gap-2 w-full">
                  <div className="bg-slate-100 px-2 flex items-center rounded-md">
                    <Tooltip content="Buscar" showArrow>
                      <button
                        onClick={() => handleOpenSearchPS()}
                        name="buscar"
                        className=" text-terciario hover:scale-110 duration-200 ease-in"
                      >
                        <SearchIcon />
                      </button>
                    </Tooltip>
                  </div>
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
                <Input
                  className="h-12"
                  ref={quantityInput}
                  isRequired
                  variant="underlined"
                  label="Precio"
                  type="number"
                  inputMode="numeric"
                  step={0.01}
                  name="unit_price"
                  value={
                    formDataDetail.unit_price === 0
                      ? ""
                      : formDataDetail.unit_price.toString()
                  }
                  onChange={handleOnChangeDetail}
                  onFocus={handleFocus}
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
                  onFocus={handleFocus}
                  tabIndex={4}
                />
              </div>
              <div className="flex justify-end items-center text-slate-600 gap-1">
                <span>Total:</span>
                <small className="font-bold">
                  {moneyFormat(
                    formDataDetail.unit_price * formDataDetail.quantity
                  )}
                </small>
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
