import { fetchAPI } from "@/components/Utils/fetchAPI";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { BusinessDefault } from "@/data/constants";
import { ChangeIcon } from "@/icons/ChangeIcon";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import { $selectedBusiness } from "@/stores/business";
import { $GlobalLoading, $refetchBusinessHeader } from "@/stores/generalConfig";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useBusinessesPage = ({ name }: { name: string }) => {
  const businessForUpdate = {
    id: 0,
    typeOfUpdate: "",
  };
  const [form, setForm] = useState({ name });
  const [nameForUpdate, setNameForUpdate] = useState({ name });
  const [selectedBusinessForUpdate, setSelectedBusinessForUpdate] =
    useState(businessForUpdate);
  const selectedBusiness = useStore($selectedBusiness);
  const [business, setBusiness] = useState<InterfacesBusinessPage[]>([
    BusinessDefault,
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    status: statusBusiness,
    data: dataBusiness,
    isLoading: isLoadingBusiness,
    refetch,
  } = useQuery({
    queryKey: ["businessPage"],
    queryFn: async () =>
      await fetchAPI({
        url: "users_business?active=0",
      }),
    retry: 2,
  });
  const {
    status: statusCreateBusiness,
    mutate: mutateCreateBusiness,
    isPending: isPendingCreateBusiness,
  } = useMutation({
    mutationKey: ["create-business"],
    mutationFn: async () =>
      await fetchAPI({
        url: "users_business",
        method: "POST",
        body: form,
      }),
  });
  const {
    status: statusDeactivateBusiness,
    mutate: mutateDeactivateBusiness,
    error: errorDeactivateBusiness,
  } = useMutation({
    mutationKey: ["deactivate-business"],
    mutationFn: async () =>
      await fetchAPI({
        url: `users_business/deactivate/${selectedBusinessForUpdate.id}`,
      }),
  });
  const {
    status: statusUpdateBusiness,
    mutate: mutateUpdateBusiness,
    error: errorUpdateBusiness,
  } = useMutation({
    mutationKey: ["update-business"],
    mutationFn: async () =>
      await fetchAPI({
        url: `users_business/${selectedBusinessForUpdate.id}`,
        method: "POST",
        body: nameForUpdate,
      }),
  });
  useEffect(() => {
    if (statusUpdateBusiness === "success") {
      refetch();

      toast.success("Negocio Actualizado");
      $refetchBusinessHeader.set(true);
      setTimeout(() => {
        $refetchBusinessHeader.set(false);
      }, 1000);
    } else if (statusUpdateBusiness === "error") {
      toast.error(errorUpdateBusiness.message);
    }
  }, [statusUpdateBusiness, refetch, errorUpdateBusiness]);

  useEffect(() => {
    if (statusDeactivateBusiness === "success") {
      refetch();
      toast.success("Negocio Actualizado");
      $refetchBusinessHeader.set(true);
      setTimeout(() => {
        $refetchBusinessHeader.set(false);
      }, 1000);
    } else if (statusDeactivateBusiness === "error") {
      toast.error(errorDeactivateBusiness.message);
    }
  }, [statusDeactivateBusiness, refetch, errorDeactivateBusiness]);
  useEffect(() => {
    if (
      selectedBusinessForUpdate.id > 0 &&
      selectedBusinessForUpdate.typeOfUpdate === "deactivate"
    ) {
      mutateDeactivateBusiness();
      setSelectedBusinessForUpdate(businessForUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBusinessForUpdate, mutateDeactivateBusiness]);
  useEffect(() => {
    if (statusCreateBusiness === "success") {
      $refetchBusinessHeader.set(true);
      setTimeout(() => {
        $refetchBusinessHeader.set(false);
      }, 1000);
      refetch();
      setForm({ name: "" });
    }
  }, [statusCreateBusiness, refetch]);
  useEffect(() => {
    refetch();
  }, [selectedBusiness, refetch]);
  useEffect(() => {
    refetch();
  }, [selectedBusiness, refetch]);

  useEffect(() => {
    $GlobalLoading.set({
      isLoading: isLoadingBusiness,
      message: `Cargando Negocios`,
    });
  }, [isLoadingBusiness]);

  useEffect(() => {
    if (statusBusiness === "success") {
      setBusiness(dataBusiness);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusBusiness, dataBusiness]);
  const handleDeactivateBusiness = (e: any, index: number) => {
    e.preventDefault();
    setSelectedBusinessForUpdate({
      id: business[index].id,
      typeOfUpdate: "deactivate",
    });
  };
  const handleOpenModalUpdateBusiness = (e: any, index: number) => {
    e.preventDefault();
    onOpen();
    setSelectedBusinessForUpdate({
      id: business[index].id,
      typeOfUpdate: "update",
    });
    setNameForUpdate({ name: business[index].name });
  };
  const handleUpdateBusiness = (e: any, onClose: () => void) => {
    e.preventDefault();
    if (
      nameForUpdate.name ===
      business.find((item) => item.id === selectedBusinessForUpdate.id)?.name
    ) {
      toast.error("No se ha realizado ningun cambio en el nombre del negocio");
      return;
    } else if (nameForUpdate.name === "") {
      toast.error("El nombre del negocio no puede estar vacio");
      return;
    }
    mutateUpdateBusiness();
    onClose();
  };
  const columnNames: ColumnNamesProps[] = [
    { key: "name", name: "Nombre" },
    { key: "activo", name: "Status" },
    { key: "actions", name: "Acciones" },
  ];
  const handleCreateBusiness = (e: any) => {
    e.preventDefault();
    mutateCreateBusiness();
  };
  const handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleOnChange(setNameForUpdate, e);

  const handleOnClearForm = (name: string) =>
    handleOnClear(name, setNameForUpdate);
  const renderCell = (
    business: InterfacesBusinessPage,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "name":
        return <p className="">{business.name}</p>;
      case "activo":
        return (
          <p className="text-right">
            {business.active ? "Activo" : "Inactivo"}
          </p>
        );

      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Tooltip color={"default"} content="Actualizar Negocio">
              <button
                onClick={(e) => handleOpenModalUpdateBusiness(e, index)}
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
                        onSubmit={(e) => handleUpdateBusiness(e, onClose)}
                        className="flex gap-1 items-center justify-center"
                      >
                        <Input
                          size="sm"
                          type="text"
                          label="Editar nombre de negocio"
                          placeholder="Ingresa el nombre del negocio"
                          onClear={() => handleOnClearForm("name")}
                          value={nameForUpdate.name}
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
            <Tooltip
              color={business.active ? "danger" : "success"}
              content={business.active ? "Desactivar" : "Activar"}
            >
              <button
                onClick={(e) => handleDeactivateBusiness(e, index)}
                className={`text-lg ${
                  business.active ? "text-danger" : "text-success"
                } cursor-pointer active:opacity-50`}
              >
                <DeleteRowIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return <p>Columna Invalida</p>;
    }
  };
  return {
    ...form,
    business,
    columnNames,
    renderCell,
    handleCreateBusiness,
    isPendingCreateBusiness,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
    handleOnClear: (name: string) => handleOnClear(name, setForm),
  };
};
