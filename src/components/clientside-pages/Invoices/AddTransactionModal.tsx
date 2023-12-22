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
export const AddTransactionModal = ({
  handleTransactions,
}: handleTransactionsProps) => {
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
                Nueva Transaccion
              </ModalHeader>
              <ModalBody className="flex justify-center">
                <AddTransactionForm
                  handleTransactions={handleTransactions}
                  onClose={onClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  form="add-transaction-form"
                  className="uppercase"
                  color="primary"
                  variant="solid"
                  type="submit"
                >
                  Agregar
                </Button>
                <Button
                  type="button"
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
