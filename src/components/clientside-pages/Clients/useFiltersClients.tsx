import { clientDefault } from "@/data/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
export const useFiltersClients = ({
  data,
  status,
  isShowActivoButton,
  searchClient,
}: FilterClientsProps) => {
  const selectedBusiness = useStore($selectedBusiness);
  const [clients, setClients] = useState([clientDefault]);
  const [clientsActives, setClientsActives] = useState([clientDefault]);
  const [clientsSearched, setClientsSearched] = useState([clientDefault]);

  //filtra los clientes por negocio
  useEffect(() => {
    if (status === "success") {
      const clients = data.filter((item: ClientProps) =>
        item.balances?.some(
          (balance) => balance.users_business?.id === selectedBusiness
        )
      );
      setClients(clients);
    } else if (status === "error") {
      toast.error("Error al cargar los clientes");
      setClients([clientDefault]);
    }
  }, [selectedBusiness, data, status]);

  //filtra los clientes por activos o inactivos
  useEffect(() => {
    if (isShowActivoButton)
      setClientsActives(
        clients.filter((item: ClientProps) => item.active === true)
      );
    else
      setClientsActives(
        clients.filter((item: ClientProps) => item.active === false)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowActivoButton, clients]);

  //filtra los clientes por nombre, email, celular o detalle
  useEffect(() => {
    if (searchClient.length > 0) {
      const searchLower = searchClient.toLowerCase();
      const filtered = clientsActives.filter((client: ClientProps) => {
        const usernameMatch = client.username
          .toLowerCase()
          .includes(searchLower);
        const cellphoneMatch =
          client.cellphone && client.cellphone.includes(searchClient);
        const emailMatch =
          client.email && client.email.toLowerCase().includes(searchLower);
        const detailMatch =
          client.detail && client.detail.toLowerCase().includes(searchLower);
        return usernameMatch || cellphoneMatch || emailMatch || detailMatch;
      });

      if (filtered.length === 0) {
        return;
      }
      setClientsSearched(filtered);
    } else {
      setClientsSearched(clientsActives);
    }
  }, [searchClient, clientsActives]);

  return {
    clientsSearched,
  };
};
