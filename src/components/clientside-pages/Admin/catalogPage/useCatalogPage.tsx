import { fetchAPI } from "@/components/Utils/fetchAPI";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { productsAndServicesDefault } from "@/data/constants";
import { ChangeIcon } from "@/icons/ChangeIcon";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCatalogPage = () => {
  const selectedBusiness = useStore($selectedBusiness);
  const [catalog, setCatalog] = useState<DataProductsAndServicesProps[]>([
    productsAndServicesDefault,
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    status: statusProductsAndServices,
    data: dataProductsAndServices,
    refetch: refetchProductsAndServices,
  } = useQuery({
    queryKey: ["user-products-and-services"],
    queryFn: async () =>
      await fetchAPI({
        url: `products_and_services/${selectedBusiness.id}`,
      }),
    retry: 2,
  });
  useEffect(() => {
    if (statusProductsAndServices === "success") {
      setCatalog(dataProductsAndServices);
    } else if (statusProductsAndServices === "error") {
      toast.error("Error al cargar los productos y servicios");
    }
  }, [statusProductsAndServices, dataProductsAndServices]);
  const handleOnClearForm = (name: string) => handleOnClear(name, setCatalog);
  const handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleOnChange(setCatalog, e);
  const columnNames: ColumnNamesProps[] = [
    { key: "name", name: "Nombre" },
    { key: "description", name: "Descripcion" },
    { key: "actions", name: "Acciones" },
  ];
  const renderCell = (
    catalog: DataProductsAndServicesProps,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "name":
        return <p className="">{catalog.name}</p>;
      case "description":
        return <p className="text-right">{catalog.description}</p>;

      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Tooltip color={"default"} content="Actualizar Negocio">
              <button
                /*  onClick={(e) => handleOpenModalUpdateBusiness(e, index)} */
                className={`text-lg cursor-pointer active:opacity-50`}
              >
                <ChangeIcon className="w-6 text-primary-500" />
              </button>
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
                      Actualizar Negocio
                    </ModalHeader>
                    <ModalBody className="flex justify-center">
                      <form
                        id="updateBusiness-form"
                        /*  onSubmit={(e) => handleUpdateBusiness(e, onClose)} */
                        className="flex gap-1 items-center justify-center"
                      >
                        <Input
                          size="sm"
                          type="text"
                          label="Editar nombre de negocio"
                          placeholder="Ingresa el nombre del negocio"
                          onClear={() => handleOnClearForm("name")}
                          value={catalog.name}
                          onChange={handleOnChangeForm}
                          name="name"
                          isClearable
                          required
                          /* disabled={isPendingCreateBusiness} */
                        ></Input>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        form="updateBusiness-form"
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
                        onPress={onClose}
                      >
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        );
      default:
        return <p>Columna Invalida</p>;
    }
  };
  return {
    catalog,
    columnNames,
    renderCell,
    handleOnChange,
    handleOnClear,
  };
};
