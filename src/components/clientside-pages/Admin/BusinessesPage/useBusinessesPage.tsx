import { fetchAPI } from "@/components/Utils/fetchAPI";
import { BusinessDefault } from "@/data/constants";
import { AddIcon } from "@/icons/AddIcon";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import { $selectedBusiness } from "@/stores/business";
import { $GlobalLoading } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useBusinessesPage = () => {
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
    console.log("Desactivar negocio", business[index]);
  };
  const columnNames: ColumnNamesProps[] = [
    { key: "name", name: "Nombre" },
    { key: "activo", name: "Status" },
    { key: "actions", name: "Acciones" },
  ];
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
  return { business, columnNames, renderCell };
};
