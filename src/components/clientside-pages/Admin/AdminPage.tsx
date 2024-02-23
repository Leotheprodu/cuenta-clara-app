"use client";

import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { $selectedBusiness } from "@/stores/business";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";

export const AdminPage = () => {
  useNamingPagesRoutes({ internalLink: "admin" });
  const user = useStore($user);
  const { showLoading, LoadingElement } = useLoadingByCriticProcess();
  const selectedBusiness = useStore($selectedBusiness);
  if (showLoading) return LoadingElement;

  return (
    <div className="flex flex-col gap-10 p-4">
      <p className="text-primario">
        Hola{" "}
        {user.employee.isEmployee
          ? user.employee.employeeName
          : user.user.username}{" "}
        , navega por el menu de la izquierda para administrar todo lo
        relacionado a <span className="font-bold">{selectedBusiness.name}</span>
        , si quieres cambiar algo de otro de tus negocios, recuerda que puede
        seleccionar uno de tus otros negocios en el menu de seleccion de
        negocios en la parte superior de tu pantalla, tambien puede crear,
        editar o desactivar tus negocios en el menu de negocios.
      </p>
    </div>
  );
};
