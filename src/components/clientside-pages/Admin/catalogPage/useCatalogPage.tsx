import { moneyFormat } from "@/components/Utils/dataFormat";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { productAndServiceCodeClean } from "@/components/Utils/productAndServiceCodeClean";
import {
  inputErrorDefault,
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
import { $user } from "@/stores/users";
import { CopyContentIcon } from "@/icons/CopyContentIcon";

export const useCatalogPage = () => {
  const user = useStore($user);
  const selectedBusiness = useStore($selectedBusiness);
  const [typeValue, setTypeValue] = useState<Selection>(new Set(["service"]));
  const [unitValue, setUnitValue] = useState<Selection>(new Set(["unidad"]));
  const [inputError, setInputError] = useState(inputErrorDefault);
  const [productOrService, setProductOrService] =
    useState<DataProductsAndServicesProps>(productsAndServicesDefault);
  const [allCodesOfCatalog, setAllCodesOfCatalog] = useState<string[]>(["0"]);
  const [allCatalog, setAllCatalog] = useState<DataProductsAndServicesProps[]>([
    productsAndServicesDefault,
  ]);
  const {
    isOpen: isOpenupdateProductOrService,
    onOpen: onOpenupdateProductOrService,
    onOpenChange: onOpenChangeupdateProductOrService,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateProductOrService,
    onOpen: onOpenCreateProductOrService,
    onOpenChange: onOpenChangeCreateProductOrService,
  } = useDisclosure();
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
  const {
    status: statusUpdateDefaultProductsAndServices,
    mutate: mutateUpdateDefaultProductsAndServices,
    isPending: isPendingUpdateDefaultProductsAndServices,
  } = useMutation({
    mutationKey: ["update-default-products-and-services"],
    mutationFn: async (id: number) =>
      await fetchAPI({
        url: `products_and_services/${id}`,
        method: "PATCH",
      }),
  });
  const {
    status: statusCreateProductsAndServices,
    mutate: mutateCreateProductsAndServices,
    isPending: isPendingCreateProductsAndServices,
  } = useMutation({
    mutationKey: ["create-products-and-services"],
    mutationFn: async () =>
      await fetchAPI({
        url: "products_and_services",
        method: "POST",
        body: productOrService,
      }),
  });

  useEffect(() => {
    const codes = allCatalog.map((item) => item.code);
    setAllCodesOfCatalog(codes);
  }, [allCatalog]);
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
    const type = Array.from(typeValue)[0].toString();
    type !== "" &&
      setProductOrService({
        ...productOrService,
        type,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeValue]);
  useEffect(() => {
    unitValue &&
      setProductOrService({
        ...productOrService,
        unit: Array.from(unitValue)[0].toString(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitValue]);
  useEffect(() => {
    refetchProductsAndServices();
  }, [selectedBusiness, refetchProductsAndServices]);
  useEffect(() => {
    if (statusProductsAndServices === "success") {
      setAllCatalog(dataProductsAndServices);
    }
  }, [statusProductsAndServices, dataProductsAndServices]);
  useEffect(() => {
    if (statusUpdateProductsAndServices === "success") {
      refetchProductsAndServices();
      toast.success("Producto o servicio actualizado");
    } else if (statusUpdateProductsAndServices === "error") {
      toast.error("Error al actualizar producto o servicio");
    }
  }, [statusUpdateProductsAndServices, refetchProductsAndServices]);
  useEffect(() => {
    if (statusCreateProductsAndServices === "success") {
      refetchProductsAndServices();
      toast.success("Producto o servicio Creado");
    } else if (statusCreateProductsAndServices === "error") {
      toast.error("Error al actualizar producto o servicio");
    }
  }, [statusCreateProductsAndServices, refetchProductsAndServices]);
  const handleOnClearForm = (name: string) =>
    handleOnClear(name, setProductOrService);
  const handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(setProductOrService, e);
    const inputName = e.target.name;
    if (inputName === "code") {
      setInputError({ ...inputError, code: false });
    }
  };
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
  const handleOpenModalUpdateItem = (
    e: React.MouseEvent,
    item: DataProductsAndServicesProps
  ) => {
    e.preventDefault();
    setProductOrService({
      ...item,
      code: productAndServiceCodeClean(item.code),
    });
    setTypeValue(new Set([item.type]));
    setUnitValue(new Set([item.unit]));
    setInputError(inputErrorDefault);
    onOpenupdateProductOrService();
  };
  const handleOpenModalCreateCopyItem = (
    e: React.MouseEvent,
    item: DataProductsAndServicesProps
  ) => {
    e.preventDefault();
    setProductOrService({
      ...item,
      code: "",
      id: 0,
    });
    setTypeValue(new Set([item.type]));
    setUnitValue(new Set([item.unit]));
    setInputError({ code: true });
    onOpenCreateProductOrService();
  };
  const handleOpenModalCreateItem = () => {
    setProductOrService({
      ...productsAndServicesDefault,
      business_id: selectedBusiness.id,
      user_id: user.user.id,
      type: "product",
    });
    setTypeValue(new Set(["product"]));
    setUnitValue(new Set(["unidad"]));
    setInputError(inputErrorDefault);
    onOpenCreateProductOrService();
  };
  const handleInventory_controlItem = () => {
    setInputError(inputErrorDefault);
    setProductOrService({
      ...productOrService,
      inventory_control: !productOrService.inventory_control,
    });
  };
  const handleChangeDefaultItem = (item: DataProductsAndServicesProps) => {
    if (item.default) return;
    mutateUpdateDefaultProductsAndServices(item.id, {
      onSuccess: () => {
        refetchProductsAndServices();
        toast.success("Producto o servicio favorito actualizado");
      },
      onError: () => {
        toast.error("Error al actualizar producto o servicio favorito");
      },
    });
  };
  const handleSubmitUpdate = (e: any, onClose: () => void) => {
    e.preventDefault();
    const codeAssembly = `${user.user.id}-${productOrService.business_id}-${productOrService.code}`;
    const existingProduct = allCatalog?.find(
      (item) => item.id === productOrService.id
    );
    const existingCode = existingProduct ? existingProduct.code : "0";
    if (productOrService.unit_price <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    } else if (
      existingCode !== codeAssembly &&
      allCodesOfCatalog.includes(codeAssembly)
    ) {
      setInputError({ code: true });
      toast.error("El codigo ya existe");
      return;
    }
    setProductOrService({
      ...productOrService,
      code: codeAssembly,
    });
    onClose();
    setTimeout(() => {
      mutateUpdateProductsAndServices();
    }, 500);
  };
  const handleSubmitCreate = (e: any, onClose: () => void) => {
    e.preventDefault();
    const codeAssembly = `${user.user.id}-${productOrService.business_id}-${productOrService.code}`;
    if (productOrService.unit_price <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    } else if (productOrService.code === "") {
      setInputError({ code: true });
      toast.error("El codigo no puede estar vacio");
      return;
    } else if (allCodesOfCatalog.includes(codeAssembly)) {
      setInputError({ code: true });
      toast.error("El codigo ya existe");
      return;
    }
    setProductOrService({
      ...productOrService,
      code: codeAssembly,
    });
    onClose();
    setTimeout(() => {
      mutateCreateProductsAndServices();
    }, 500);
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
        return <p className=" break-words">{catalog.description}</p>;
      case "type":
        return (
          <p className="">
            {catalog.type && typeOfProductsAndServices[catalog.type].nombre}
          </p>
        );
      case "unit":
        return <p className="">{catalog.unit}</p>;
      case "default":
        return (
          <Checkbox
            className="my-0 mx-auto"
            disabled={allCatalog?.length === 1}
            isSelected={catalog.default}
            onValueChange={() => handleChangeDefaultItem(catalog)}
          ></Checkbox>
        );
      case "price":
        return <p className="">{moneyFormat(catalog.unit_price)}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-4">
            <Tooltip color={"warning"} content="Editar">
              <button
                onClick={(e) => handleOpenModalUpdateItem(e, catalog)}
                className={`text-lg cursor-pointer active:opacity-50`}
              >
                <EditRowIcon className=" text-terciario" />
              </button>
            </Tooltip>
            <Tooltip color={"success"} content="Crear Copia">
              <button
                onClick={(e) => handleOpenModalCreateCopyItem(e, catalog)}
                className={`text-lg cursor-pointer active:opacity-50`}
              >
                <CopyContentIcon className=" text-success-500" />
              </button>
            </Tooltip>
            <Modal
              size="2xl"
              backdrop="opaque"
              isOpen={isOpenupdateProductOrService}
              onOpenChange={onOpenChangeupdateProductOrService}
            >
              <ModalContent>
                {(onCloseupdateProductOrService) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Editar Producto o Servicio
                    </ModalHeader>
                    <ModalBody className="flex justify-center">
                      <CatalogForm
                        handleCatalogForm={{
                          setInputError,
                          inputError,
                          typeValue,
                          setTypeValue,
                          unitValue,
                          setUnitValue,
                          productOrService,
                          handleSubmit: handleSubmitUpdate,
                          onClose: onCloseupdateProductOrService,
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
                        onPress={onCloseupdateProductOrService}
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
    isOpenCreateProductOrService,
    onOpenChangeCreateProductOrService,
    handleOpenModalCreateItem,
    handleCreate: {
      setInputError,
      inputError,
      typeValue,
      setTypeValue,
      unitValue,
      setUnitValue,
      productOrService,
      handleSubmit: handleSubmitCreate,
      handleOnChangeForm,
      handleOnClearForm,
      handleInventory_controlItem,
    },
  };
};
