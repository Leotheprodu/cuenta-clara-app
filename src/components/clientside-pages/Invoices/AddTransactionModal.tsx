import { AddTransactionForm } from "@/components/forms/AddTransactionForm/AddTransactionForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
export const AddTransactionModal = ({ invoice }: { invoice: Invoice }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Agregar" color="primary">
        <Button
          onPress={onOpen}
          className="uppercase"
          color="primary"
          variant="solid"
        >
          Nueva Transaccion
        </Button>
      </Tooltip>
      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Transacciones
              </ModalHeader>
              <ModalBody className="flex justify-center">
                <AddTransactionForm invoice={invoice} />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="uppercase"
                  color="warning"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
