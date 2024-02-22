import { moneyFormat } from "@/components/Utils/dataFormat";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { productAndServiceCodeClean } from "@/components/Utils/productAndServiceCodeClean";
import {
  productsAndServicesDefault,
  typeOfProductsAndServices,
} from "@/data/constants";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CatalogForm } from "./CatalogForm";
import { $GlobalLoading } from "@/stores/generalConfig";
import { EditRowIcon } from "@/icons/EditRowIcon";

export const useCatalogPage = () => {
  const selectedBusiness = useStore($selectedBusiness);
  const [typeValue, setTypeValue] = useState<Selection>(new Set(["service"]));
  const [productOrService, setProductOrService] =
    useState<DataProductsAndServicesProps>(productsAndServicesDefault);
  const [allCatalog, setAllCatalog] = useState<DataProductsAndServicesProps[]>([
    productsAndServicesDefault,
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    status: statusProductsAndServices,
    data: dataProductsAndServices,
    refetch: refetchProductsAndServices,
    isLoading: isLoadingProductsAndServices,
  } = useQuery({
    queryKey: ["user-catalog"],
    queryFn: async () =>
      await fetchAPI({
        url: `products_and_services/${selectedBusiness.id}`,
      }),
  });
  const {
    status: statusUpdateProductsAndServices,
    mutate: mutateUpdateProductsAndServices,
    isPending: isPendingUpdateProductsAndServices,
  } = useMutation({
    mutationKey: ["update-products-and-services"],
    mutationFn: async () =>
      await fetchAPI({
        url: "products_and_services",
        method: "PUT",
        body: productOrService,
      }),
  });
  useEffect(() => {
    if (statusUpdateProductsAndServices === "success") {
      toast.success("Producto o servicio actualizado con exito");
      refetchProductsAndServices();
      setProductOrService(productsAndServicesDefault);
    } else if (statusUpdateProductsAndServices === "error") {
      toast.error("Error al actualizar producto o servicio");
    }
  }, [statusUpdateProductsAndServices, refetchProductsAndServices]);
  useEffect(() => {
    if (allCatalog?.length === 0) {
      refetchProductsAndServices();
    }
  }, [allCatalog, refetchProductsAndServices]);

  useEffect(() => {
    $GlobalLoading.set({
      isLoading: isLoadingProductsAndServices,
      message: `Cargando productos y servicios...`,
    });
  }, [isLoadingProductsAndServices]);
  useEffect(() => {
    $GlobalLoading.set({
      isLoading: isPendingUpdateProductsAndServices,
      message: `Actualizando producto o servicio...`,
    });
  }, [isPendingUpdateProductsAndServices]);
  useEffect(() => {
    typeValue &&
      setProductOrService({
        ...productOrService,
        type: Array.from(typeValue)[0].toString(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeValue]);
  useEffect(() => {
    refetchProductsAndServices();
  }, [selectedBusiness, refetchProductsAndServices]);
  useEffect(() => {
    if (statusProductsAndServices === "success") {
      setAllCatalog(dataProductsAndServices);
    }
  }, [statusProductsAndServices, dataProductsAndServices]);
  const handleOnClearForm = (name: string) =>
    handleOnClear(name, setProductOrService);
  const handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleOnChange(setProductOrService, e);
  const columnNames: ColumnNamesProps[] = [
    { key: "code", name: "Codigo" },
    { key: "name", name: "Nombre" },
    { key: "description", name: "Descripcion" },
    { key: "type", name: "Tipo" },
    { key: "unit", name: "Unidad" },
    { key: "price", name: "Precio" },
    { key: "default", name: "Favorito" },
    { key: "actions", name: "Acciones" },
  ];
  const handleOpenModalUpdateItem = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setProductOrService({
      ...allCatalog[index],
      code: productAndServiceCodeClean(allCatalog[index].code),
    });
    setTypeValue(new Set([allCatalog[index].type]));
    onOpen();
  };
  const handleInventory_controlItem = () => {
    setProductOrService({
      ...productOrService,
      inventory_control: !productOrService.inventory_control,
    });
  };
  const handleChangeDefaultItem = (index: number) => {
    if (allCatalog[index].default) {
      return;
    }
  };
  const handleSubmitCatalogForm = (e: any, onClose: () => void) => {
    e.preventDefault();
    if (productOrService.unit_price <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }
    setProductOrService({
      ...productOrService,
      code: `${productOrService.id}-${productOrService.business_id}-${productOrService.code}`,
    });
    onClose();
    setTimeout(() => {
      mutateUpdateProductsAndServices();
    }, 500);
  };
  const renderCell = (
    catalog: DataProductsAndServicesProps,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "code":
        return (
          <p className="text-center">
            {productAndServiceCodeClean(catalog.code)}
          </p>
        );
      case "name":
        return <p className="text-center">{catalog.name}</p>;
      case "description":
        return <p className="text-center">{catalog.description}</p>;
      case "type":
        return (
          <p className="text-center">
            {catalog.type && typeOfProductsAndServices[catalog.type].nombre}
          </p>
        );
      case "unit":
        return <p className="text-center">{catalog.unit}</p>;
      case "default":
        return (
          <Checkbox
            className="my-0 mx-auto"
            disabled={allCatalog?.length === 1}
            isSelected={catalog.default}
            onValueChange={() => handleChangeDefaultItem(index)}
          ></Checkbox>
        );
      case "price":
        return <p className="text-center">{moneyFormat(catalog.unit_price)}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Tooltip color={"warning"} content="Editar producto/servicio">
              <button
                onClick={(e) => handleOpenModalUpdateItem(e, index)}
                className={`text-lg cursor-pointer active:opacity-50`}
              >
                <EditRowIcon className=" text-terciario" />
              </button>
            </Tooltip>
            <Modal
              size="2xl"
              backdrop="opaque"
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
                      <CatalogForm
                        handleCatalogForm={{
                          typeValue,
                          setTypeValue,
                          productOrService,
                          handleSubmitCatalogForm,
                          onClose,
                          handleOnChangeForm,
                          handleOnClearForm,
                          handleInventory_controlItem,
                        }}
                        formId="updateProductOrService"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        form="updateProductOrService"
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
    allCatalog,
    columnNames,
    renderCell,
    handleOnChange,
    handleOnClear,
  };
};
