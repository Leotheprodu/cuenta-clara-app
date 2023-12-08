import { moneyFormat } from "@/components/Utils/dataFormat";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

export const ChangeCalculator = ({ total }: { total: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [change, setChange] = useState<number>(0);
  const [received, setReceived] = useState<number>(0);

  useEffect(() => {
    if (received - total < 0) {
      setChange(0);
    } else {
      setChange(received - total);
    }
  }, [received, total]);

  return (
    <>
      <Button variant="light" color="primary" onPress={onOpen}>
        Calcular Vuelto
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Calcule el vuelto
              </ModalHeader>
              <ModalBody className="grid grid-cols-2">
                <div>
                  <Input
                    label="Monto recibido"
                    type="number"
                    placeholder="Monto recibido"
                    value={received.toString()}
                    onChange={(e) => setReceived(parseInt(e.target.value) || 0)}
                    color="primary"
                  ></Input>
                  <div className="flex items-center justify-center gap-1 flex-wrap mt-4">
                    <Button
                      onPress={() => setReceived(received + 100)}
                      variant="flat"
                      className="text-xs"
                    >
                      +100
                    </Button>
                    <Button
                      onPress={() => setReceived(received + 500)}
                      variant="flat"
                      className="text-xs"
                    >
                      +500
                    </Button>
                    <Button
                      onPress={() => setReceived(received + 1000)}
                      variant="flat"
                      className="text-xs"
                    >
                      +1000
                    </Button>
                    <Button
                      onPress={() => setReceived(received + 5000)}
                      variant="flat"
                      className="text-xs"
                    >
                      +5000
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-primario font-bold">Recibido:</span>
                    <small className="text-secundario text-lg">
                      {moneyFormat(received)}
                    </small>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primario font-bold"> - Total:</span>
                    <small className=" text-lg text-danger-300">
                      {moneyFormat(total)}
                    </small>
                  </div>
                  <div className="flex justify-between scale-110 bg-gris rounded-md shadow-sm p-2 border-b-1 border-terciario">
                    <span className="text-primario font-bold">Vuelto:</span>
                    <small className="text-secundario text-lg font-bold">
                      {moneyFormat(change)}
                    </small>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
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
