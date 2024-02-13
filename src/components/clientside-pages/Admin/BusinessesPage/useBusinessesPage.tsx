import { fetchAPI } from "@/components/Utils/fetchAPI";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { BusinessDefault } from "@/data/constants";
import { AddIcon } from "@/icons/AddIcon";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import { $selectedBusiness } from "@/stores/business";
import { $GlobalLoading, $refetchBusinessHeader } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { Tooltip } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useBusinessesPage = ({ name }: { name: string }) => {
  const [form, setForm] = useState({ name });
  const selectedBusiness = useStore($selectedBusiness);
  const [business, setBusiness] = useState<InterfacesBusinessPage[]>([
    BusinessDefault,
  ]);
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
    data: dataCreateBusiness,
    mutate: mutateCreateBusiness,
    error: errorCreateBusiness,
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
  useEffect(() => {
    if (statusBusiness === "success") {
      setBusiness(dataBusiness);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusBusiness, dataBusiness]);
  const handleDeactivateBusiness = (e: any, index: number) => {
    e.preventDefault();
    console.log("Desactivar negocio", business[index]);
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
