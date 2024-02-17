import { moneyFormat } from "@/components/Utils/dataFormat";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { productAndServiceCodeClean } from "@/components/Utils/productAndServiceCodeClean";
import {
  productsAndServicesDefault,
  typeOfProductsAndServices,
} from "@/data/constants";
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
  Select,
  SelectItem,
  Selection,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCatalogPage = () => {
  const selectedBusiness = useStore($selectedBusiness);
  const [typeValue, setTypeValue] = useState<Selection>(new Set(["service"]));
  const [productOrService, setProductOrService] =
    useState<DataProductsAndServicesProps>(productsAndServicesDefault);
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
      setCatalog(dataProductsAndServices);
    } else if (statusProductsAndServices === "error") {
      toast.error("Error al cargar los productos y servicios");
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
    { key: "actions", name: "Acciones" },
  ];
  const handleOpenModalUpdateItem = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setProductOrService(catalog[index]);
    setTypeValue(new Set([catalog[index].type]));
    onOpen();
  };
  const renderCell = (
    catalog: DataProductsAndServicesProps,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "code":
        return <p className="">{productAndServiceCodeClean(catalog.code)}</p>;
      case "name":
        return <p className="">{catalog.name}</p>;
      case "description":
        return <p className="text-right">{catalog.description}</p>;
      case "type":
        return (
          <p className="">
            {catalog.type && typeOfProductsAndServices[catalog.type].nombre}
          </p>
        );
      case "unit":
        return <p className="">{catalog.unit}</p>;
      case "price":
        return <p className="">{moneyFormat(catalog.unit_price)}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Tooltip color={"default"} content="Actualizar Negocio">
              <button
                onClick={(e) => handleOpenModalUpdateItem(e, index)}
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
                        id="updateProductOrService-form"
                        /*  onSubmit={(e) => handleUpdateBusiness(e, onClose)} */
                        className="flex flex-col gap-1 items-center justify-center"
                      >
                        <Select
                          selectedKeys={typeValue}
                          onSelectionChange={setTypeValue}
                          label="Tipo"
                          className="max-w-xs"
                        >
                          {[
                            { value: "service", label: "Servicio" },
                            { value: "product", label: "Producto" },
                          ].map((servOrProduct) => (
                            <SelectItem
                              key={servOrProduct.value}
                              value={servOrProduct.value}
                            >
                              {servOrProduct.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <Input
                          className="max-w-xs"
                          size="sm"
                          type="text"
                          label="Nombre"
                          placeholder="Ingresa el nombre del servicio o producto"
                          onClear={() => handleOnClearForm("name")}
                          value={productOrService.name}
                          onChange={handleOnChangeForm}
                          name="name"
                          isClearable
                          required
                        ></Input>
                        <Input
                          className="max-w-xs"
                          size="sm"
                          type="text"
                          label="Descripcion"
                          placeholder="Ingresa la descripcion del servicio o producto"
                          onClear={() => handleOnClearForm("description")}
                          value={productOrService.description}
                          onChange={handleOnChangeForm}
                          name="description"
                          isClearable
                          required
                        ></Input>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        form="updateProductOrService-form"
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
