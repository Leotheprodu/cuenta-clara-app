import { handleFocus, handleOnChange } from "@/components/Utils/formUtils";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import { useInvoiceDetail } from "./useInvoiceDetail";
import {
  billingPrice,
  invoicesStatus,
  productsAndServicesDefault,
} from "@/data/constants";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { $user } from "@/stores/users";
import { $AppState } from "@/stores/generalConfig";
export const useCreateInvoiceforClient = ({ id }: { id: string }) => {
  // estado para almacenar el total de la factura
  const [total, setTotal] = useState<number>(0);
  //  estado para almacenar los datos del cliente
  const [client, setClient] = useState({ username: "", active: 0 });

  const [payNow, setPayNow] = useState<boolean>(true);
  const [payment_method_id, setPayment_method_id] = useState<string>("1");
  //  estado para almacenar el negocio seleccionado
  const selectedBusiness = useStore($selectedBusiness);
  //  estado para almacenar el usuario logueado
  const user = useStore($user);
  //  estado para almacenar el estado de la aplicacion
  const appState = useStore($AppState);
  //  estado para almacenar el negocio seleccionado con el nombre y si el cliente tiene balances en ese negocio
  const [businessSelected, setBusinessSelected] =
    useState<BusinessSelecterProps>({
      id: 0,
      name: "",
      isClientInBusiness: true,
    });
  // estado para almacenar los productos y el servicio default del negocio seleccionado
  const [productsAndServices, setProductsAndServices] =
    useState<ProductsAndServicesProps>({
      all: [productsAndServicesDefault],
      default: productsAndServicesDefault,
    });
  const {
    status: statusCreateInvoice,
    error: errorCreateInvoice,
    data: dataCreateInvoice,
    mutate: mutateCreateInvoice,
  } = useMutation({
    mutationKey: ["invoice-create"],
    mutationFn: async () =>
      await fetchAPI({
        url: `invoices/create/${parseInt(id, 10)}`,
        method: "POST",
        body: formInvoice,
      }),
  });
  //  Hook para manejar los detalles de la factura
  const { createInvoiceDetail } = useInvoiceDetail({
    id,
    productsAndServices,
    selectedBusiness,
    statusCreateInvoice,
  });
  const { invoiceDetails } = createInvoiceDetail;
  const [formInvoice, setFormInvoice] = useState<FormValuesNewInvoice>({
    date: getCurrentDate(),
    business_id: selectedBusiness.id,
    total,
    invoice_details: [],
    payment_method_id: parseInt(payment_method_id, 10),
    status: payNow ? invoicesStatus.paid : invoicesStatus.pending,
  });
  // hook useEffect para setear los datos de la factura
  useEffect(() => {
    setFormInvoice({
      ...formInvoice,
      business_id: selectedBusiness.id,
      total,
      invoice_details: invoiceDetails,
      payment_method_id: parseInt(payment_method_id, 10),
      status: payNow ? invoicesStatus.paid : invoicesStatus.pending,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceDetails, total, selectedBusiness, payNow, payment_method_id]);

  //hook useEffect para calcular el monto total de la factura
  useEffect(() => {
    const total = invoiceDetails.reduce((acc, item) => {
      return acc + item.unit_price * item.quantity;
    }, 0);
    setTotal(total);
  }, [invoiceDetails]);

  // Obtener los datos del cliente
  const { status: statusFetchClient, data: clientData } = useQuery({
    queryKey: ["fetch-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients/${id}`,
      }),
    retry: 2,
  });
  //obtener los negocios del cliente que esta logueado
  const { status: statusBusiness, data: dataBusiness } = useQuery({
    queryKey: ["users-business"],
    queryFn: async () =>
      await fetchAPI({
        url: "users_business",
      }),
    retry: 2,
  });
  // obtener el balance del cliente en el negocio seleccionado
  const { status: statusBalance, data: dataBalance } = useQuery({
    queryKey: ["client-balance"],
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
        url: `products_and_services/${selectedBusiness.id}`,
      }),
    retry: 2,
  });

  useEffect(() => {
    // si el cliente existe, setearlo en el estado
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
      // buscar el nombre del negocio seleccionado
      const findBusinessName = dataBusiness.find(
        (item: BusinessProps) => item.id === selectedBusiness.id
      );
      // buscar los negocios donde el cliente tiene balances
      const businessofClient = dataBalance.map((item: any) => item.business_id);
      // setear el negocio seleccionado con el nombre y si el cliente tiene balances en ese negocio
      setBusinessSelected({
        id: findBusinessName?.id,
        name: findBusinessName?.name,
        isClientInBusiness: businessofClient?.includes(selectedBusiness.id),
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

  //obtener productos y servicios del negocio seleccionado del cliente
  useEffect(() => {
    if (statusProductsAndServices === "success") {
      const productsAndServices = dataProductsAndServices;
      // encuentra el producto o servicio default
      const defaultProductOrService = productsAndServices.find(
        (item: any) => item.default === true
      );

      setProductsAndServices({
        all: productsAndServices,
        default: defaultProductOrService,
      });
    }
  }, [statusProductsAndServices, dataProductsAndServices]);

  //cuando cambie el negocio seleccionado se refetchearan los productos y servicios
  useEffect(() => {
    selectedBusiness && refetchProductsAndServices();
  }, [selectedBusiness, refetchProductsAndServices]);

  // cuando se cree la factura se redireccionara a la pagina de la factura
  useEffect(() => {
    if (statusCreateInvoice === "success") {
      toast.success("Factura creada exitosamente");
      localStorage.removeItem(
        `invoiceDetails${user.user.id}-${selectedBusiness.id}-${id}`
      );
      $AppState.set({ ...appState, isCreatedInvoice: true });
      $user.set({
        ...user,
        balance: user.balance - total * billingPrice,
      });
      redirect(`/facturas/${id}`);
    } else if (statusCreateInvoice === "error") {
      toast.error(errorCreateInvoice?.message || "Error al crear la factura");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCreateInvoice, statusCreateInvoice, errorCreateInvoice, id]);

  //funcion para crear la factura interactuando con el servidor
  const handleCreateInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateCreateInvoice();
  };
  /*   useEffect(() => {
    console.log(payment_method_id);
  }, [payment_method_id]); */

  const handlePayNow = () => {
    setPayNow(!payNow);
  };
  const handleSelectPaymentMethod = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPayment_method_id(e.target.value);
  };
  return {
    ...formInvoice,
    ...client,
    total,
    businessSelected,
    payNow,
    handleCreateInvoice,
    handleSelectPaymentMethod,
    payment_method_id,
    handlePayNow,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setFormInvoice, e),
    createInvoiceDetail: { ...createInvoiceDetail, handleFocus },
  };
};
