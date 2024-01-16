import { TransactionsIcon } from "@/icons/TransactionsIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PaymentMethodItem } from "../Balances/PaymentMethodItem";
import { compareByKey } from "@/components/Utils/CompareStringForSort";
import { paymentMethod } from "@/data/constants";

export const PaymentMethodsModal = ({
  paymentMethods,
}: {
  paymentMethods: ClientDashboardUserPaymentMethod[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const orderedPaymentMethods = paymentMethods.sort(
    compareByKey<ClientDashboardUserPaymentMethod>("payment_method.name")
  );
  return (
    <>
      <Button
        variant="light"
        color="primary"
        className="flex justify-center items-center gap-0"
        isDisabled={paymentMethods.length === 0}
        onPress={onOpen}
      >
        <TransactionsIcon className="text-terciario h-1/2" />
        <span className="font-bold mr-1">
          {paymentMethods.length - 1 < 0 ? 0 : paymentMethods.length - 1}
        </span>
        formas de pago
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Formas de Pago
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-3 mt-2 justify-center items-center">
                  {orderedPaymentMethods.map(
                    (method) =>
                      method.payment_method.name !==
                        paymentMethod.cash.name && (
                        <PaymentMethodItem
                          key={method.id}
                          //@ts-ignore
                          payment_method={method}
                        />
                      )
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
