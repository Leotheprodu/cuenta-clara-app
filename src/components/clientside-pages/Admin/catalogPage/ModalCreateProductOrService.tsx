import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { CatalogForm } from "./CatalogForm";

export const ModalCreateProductOrService = ({
  handleCreate,
  isOpenCreateProductOrService,
  onOpenChangeCreateProductOrService,
  handleOpenModalCreateItem,
}: {
  handleCreate: any;
  isOpenCreateProductOrService: any;
  onOpenChangeCreateProductOrService: any;
  handleOpenModalCreateItem: any;
}) => {
  return (
    <section className="mt-6 flex justify-center">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-1/2">
        <p className="text-slate-500 ">
          Crea un nuevo producto o servicio para tu negocio.
        </p>
        <Button onPress={handleOpenModalCreateItem}>Crear</Button>
      </div>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={isOpenCreateProductOrService}
        onOpenChange={onOpenChangeCreateProductOrService}
      >
        <ModalContent>
          {(onCloseCreateProductOrService) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Producto o Servicio
              </ModalHeader>
              <ModalBody className="flex justify-center">
                <CatalogForm
                  handleCatalogForm={{
                    ...handleCreate,
                    onClose: onCloseCreateProductOrService,
                  }}
                  formId="createProductOrService"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  form="createProductOrService"
                  className="uppercase"
                  color="primary"
                  variant="solid"
                  type="submit"
                >
                  Aceptar
                </Button>
                <Button
                  type="button"
                  className="uppercase"
                  color="warning"
                  variant="light"
                  onPress={onCloseCreateProductOrService}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};
