import { handleFocus, handleOnChange } from "@/components/Utils/formUtils";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import { useInvoiceDetail } from "./useInvoiceDetail";
import { productsAndServicesDefault } from "@/data/constants";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { $user } from "@/stores/users";
export const useCreateInvoiceforClient = ({ id }: { id: string }) => {
  //FN estado para almacenar el total de la factura
  const [total, setTotal] = useState<number>(0);
  //FN  estado para almacenar los datos del cliente
  const [client, setClient] = useState({ username: "", active: 0 });
  //FN  estado para almacenar el negocio seleccionado
  const selectedBusiness = useStore($selectedBusiness);
  //FN  estado para almacenar el usuario logueado
  const { user } = useStore($user);
  //FN  estado para almacenar el negocio seleccionado con el nombre y si el cliente tiene balances en ese negocio
  const [businessSelected, setBusinessSelected] =
    useState<BusinessSelecterProps>({
      id: 0,
      name: "",
      isClientInBusiness: true,
    });
  //FN estado para almacenar los productos y el servicio default del negocio seleccionado
  const [productsAndServices, setProductsAndServices] =
    useState<ProductsAndServicesProps>({
      all: [productsAndServicesDefault],
      default: productsAndServicesDefault,
    });
  const {
    status: statusCreateInvoice,
    data: dataCreateInvoice,
    mutate: mutateCreateInvoice,
  } = useMutation({
    mutationKey: ["invoice-create"],
    mutationFn: async () =>
      await fetchAPI({
        url: "invoices/create",
        method: "POST",
        body: formInvoice,
      }),
  });
  //FN  Hook para manejar los detalles de la factura
  const { createInvoiceDetail } = useInvoiceDetail({
    id,
    productsAndServices,
    selectedBusiness,
    statusCreateInvoice,
  });
  const { invoiceDetails } = createInvoiceDetail;
  const [formInvoice, setFormInvoice] = useState<FormValuesNewInvoice>({
    client_id: parseInt(id, 10),
    date: getCurrentDate(),
    business_id: selectedBusiness,
    total,
    invoice_details: [],
  });
  //FN hook useEffect para setear los datos de la factura
  useEffect(() => {
    setFormInvoice({
      ...formInvoice,
      business_id: selectedBusiness,
      total,
      invoice_details: invoiceDetails,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceDetails, total, selectedBusiness]);

  //FN hook useEffect para calcular el monto total de la factura
  useEffect(() => {
    const total = invoiceDetails.reduce((acc, item) => {
      return acc + item.unit_price * item.quantity;
    }, 0);
    setTotal(total);
  }, [invoiceDetails]);

  //FN Obtener los datos del cliente
  const { status: statusFetchClient, data: clientData } = useQuery({
    queryKey: ["fetch-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients/${id}`,
      }),
    retry: 2,
  });
  //FN obtener los negocios del cliente que esta logueado
  const { status: statusBusiness, data: dataBusiness } = useQuery({
    queryKey: ["users-business"],
    queryFn: async () =>
      await fetchAPI({
        url: "users_business",
      }),
    retry: 2,
  });
  //FN obtener el balance del cliente en el negocio seleccionado
  const { status: statusBalance, data: dataBalance } = useQuery({
    queryKey: ["user-balance"],
    queryFn: async () =>
      await fetchAPI({
        url: `balances/${id}`,
      }),
    retry: 2,
  });
  const {
    status: statusProductsAndServices,
    data: dataProductsAndServices,
    refetch: refetchProductsAndServices,
  } = useQuery({
    queryKey: ["user-products-and-services"],
    queryFn: async () =>
      await fetchAPI({
        url: `products_and_services/${selectedBusiness}`,
      }),
    retry: 2,
  });

  useEffect(() => {
    //NOTE si el cliente existe, setearlo en el estado
    if (statusFetchClient === "success") {
      setClient(clientData);
    } else if (statusFetchClient === "error") {
      setClient({ username: "", active: 0 });
    }
  }, [statusFetchClient, clientData]);

  useEffect(() => {
    if (
      statusBalance === "success" &&
      statusBusiness === "success" &&
      selectedBusiness
    ) {
      //NOTE buscar el nombre del negocio seleccionado
      const findBusinessName = dataBusiness.find(
        (item: BusinessProps) => item.id === selectedBusiness
      );
      //NOTE buscar los negocios donde el cliente tiene balances
      const businessofClient = dataBalance.map((item: any) => item.business_id);
      //NOTE setear el negocio seleccionado con el nombre y si el cliente tiene balances en ese negocio
      setBusinessSelected({
        id: findBusinessName?.id,
        name: findBusinessName?.name,
        isClientInBusiness: businessofClient?.includes(selectedBusiness),
      });
    }
  }, [
    statusBalance,
    statusBusiness,
    selectedBusiness,
    dataBusiness,
    dataBalance,
    statusFetchClient,
  ]);

  //FN obtener productos y servicios del negocio seleccionado del cliente
  useEffect(() => {
    if (statusProductsAndServices === "success") {
      const productsAndServices = dataProductsAndServices;
      //NOTE encuentra el producto o servicio default
      const defaultProductOrService = productsAndServices.find(
        (item: any) => item.default === true
      );

      setProductsAndServices({
        all: productsAndServices,
        default: defaultProductOrService,
      });
    }
  }, [statusProductsAndServices, dataProductsAndServices]);

  //FN cuando cambie el negocio seleccionado se refetchearan los productos y servicios
  useEffect(() => {
    selectedBusiness && refetchProductsAndServices();
  }, [selectedBusiness, refetchProductsAndServices]);

  //FN cuando se cree la factura se redireccionara a la pagina de la factura
  useEffect(() => {
    if (statusCreateInvoice === "success") {
      toast.success("Factura creada exitosamente");
      redirect(`/facturas/${id}`);
    }
  }, [dataCreateInvoice, statusCreateInvoice, id]);

  //FN funcion para crear la factura interactuando con el servidor
  const handleCreateInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateCreateInvoice();
    localStorage.removeItem(
      `invoiceDetails${user.id}-${selectedBusiness}-${id}`
    );
  };
  return {
    ...formInvoice,
    ...client,
    total,
    businessSelected,
    handleCreateInvoice,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setFormInvoice, e),
    createInvoiceDetail: { ...createInvoiceDetail, handleFocus },
  };
};
