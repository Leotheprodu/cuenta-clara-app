import Loading from "@/app/loading";
import { internalLinks } from "@/components/Utils/internalLinks";
import { typeOfRoles } from "@/data/constants";
import { AddClientIcon } from "@/icons/AddClientIcon";
import { AddInvoiceIcon } from "@/icons/AddInvoiceIcon";
import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import { DeleteUserIcon } from "@/icons/DeleteUserIcon";
import { EditIcon } from "@/icons/EditIcon";
import { InfoIcon } from "@/icons/infoIcon";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";
import { Spinner, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
export const ClientSections = ({
  client,
  isShowActivoButton,
}: ClientCardProps) => {
  const { id } = client;
  const user = useStore($user);
  const roles = user?.roles;
  const [clickLink, setClickLink] = useState(false);
  if (clickLink) {
    return (
      <div className="flex items-center justify-center">
        <Spinner
          size="md"
          color="secondary"
          label="Cargando Sección..."
          labelColor="secondary"
          className="my-0 mx-auto"
        />
      </div>
    );
  }
  return (
    <div className="flex justify-center w-full gap-8 text-xs p-2">
      <Tooltip content="Ver Facturas" showArrow placement="top" color="primary">
        <Link
          className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-md hover:shadow-lg transition-all duration-200 p-1"
          href={`${internalLinks("client-invoices")}${id}`}
          onClick={() => setClickLink(true)}
        >
          <AddTransactionIcon className="w-6 h-6" />
        </Link>
      </Tooltip>
      <Tooltip
        content="Crear Factura"
        showArrow
        placement="top"
        color="secondary"
      >
        <Link
          className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-lg hover:shadow-lg transition-all duration-200 p-1"
          href={`${internalLinks("add-invoice")}${id}`}
          onClick={() => setClickLink(true)}
        >
          <AddInvoiceIcon className="w-6 h-6" />
        </Link>
      </Tooltip>
      <Tooltip
        content="Actualizar Cliente"
        showArrow
        placement="top"
        color="warning"
      >
        <Link
          className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-lg hover:shadow-lg transition-all duration-200 p-1"
          href={`${internalLinks("update-client")}${id}`}
          onClick={() => setClickLink(true)}
        >
          <EditIcon className="w-6 h-6" />
        </Link>
      </Tooltip>
      <Tooltip
        content={isShowActivoButton ? "Desactivar Cliente" : "Activar Cliente"}
        showArrow
        placement="top"
        color="danger"
      >
        <Link
          className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-md hover:shadow-md transition-all duration-200 p-1"
          href={`${internalLinks("deactivate-client")}${id}`}
          onClick={() => setClickLink(true)}
        >
          {isShowActivoButton ? (
            <DeleteUserIcon className="w-6 h-6" />
          ) : (
            <AddClientIcon className="w-6 h-6" />
          )}
        </Link>
      </Tooltip>
      {roles.includes(typeOfRoles.admin.id) && (
        <Tooltip
          content="Ver Recargas"
          showArrow
          placement="top"
          color="success"
        >
          <Link
            className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-lg hover:shadow-lg transition-all duration-200 p-1"
            href={`${internalLinks("recharge-client")}${id}`}
            onClick={() => setClickLink(true)}
          >
            <InfoIcon className="w-6 h-6" />
          </Link>
        </Tooltip>
      )}
    </div>
  );
};
