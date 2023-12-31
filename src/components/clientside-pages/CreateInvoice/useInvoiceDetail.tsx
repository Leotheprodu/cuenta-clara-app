import { EditRowIcon } from "@/icons/EditRowIcon";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import toast from "react-hot-toast";
import { formatNumber, moneyFormat } from "@/components/Utils/dataFormat";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import {
  initialStateInvoiceDetail,
  productsAndServicesDefault,
} from "@/data/constants";
import { productAndServiceCodeClean } from "@/components/Utils/productAndServiceCodeClean";

export const useInvoiceDetail = ({
  id,
  productsAndServices,
  selectedBusiness,
  statusCreateInvoice,
}: UseInvoiceDetailProps) => {
  const { user } = useStore($user);
  const [searchPS, setSearchPS] = useState("");
  const [filteredProductsAndServices, setFilteredProductsAndServices] =
    useState<DataProductsAndServicesProps[]>([productsAndServicesDefault]);
  // Estado para almacenar los detalles de la factura
  const [invoiceDetails, setInvoiceDetails] = useState([
    initialStateInvoiceDetail,
  ]);
  useEffect(() => {
    statusCreateInvoice === "success" && setInvoiceDetails([]);
  }, [statusCreateInvoice]);

  // Hook para manejar el modal de agregar detalle
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenModalPS,
    onOpen: onOpenModalPS,
    onOpenChange: onOpenChangeModalPS,
  } = useDisclosure();

  // Referencia para el input de código en el modal de agregar detalle
  const codeInput: React.RefObject<HTMLInputElement> = useRef(null);
  // Referencia para el input de cantidad en el modal de agregar detalle
  const quantityInput: React.RefObject<HTMLInputElement> = useRef(null);

  // Estado para almacenar si se esta editando un detalle
  const [isEditing, setIsEditing] = useState<{
    state: boolean;
    index: number | null;
  }>({ state: false, index: null });
  // Estado para almacenar los datos del detalle de la factura que se esta agregando
  const [formDataDetail, setFormDataDetail] = useState(
    initialStateInvoiceDetail
  );
  const nameOfProductOrService = (code: string) => {
    const productOrService = productsAndServices.all.find(
      (productOrService: any) =>
        productOrService.code === `${user.id}-${selectedBusiness.id}-${code}`
    );
    if (productOrService) {
      return productOrService.name;
    }
  };
  useEffect(() => {
    setFormDataDetail({
      ...formDataDetail,
      subtotal: formDataDetail.unit_price * formDataDetail.quantity,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDataDetail.quantity, formDataDetail.unit_price]);
  //Estado para almacenar las columnas de la tabla
  const columnNames: ColumnNamesProps[] = [
    { key: "code", name: "Código" },
    { key: "quantity", name: "Cantidad" },
    { key: "price", name: "Precio" },
    { key: "name", name: "Nombre" },
    { key: "description", name: "Descripción" },
    { key: "subtotal", name: "Subtotal" },
    { key: "actions", name: "Acciones" },
  ];
  // Función para abrir el modal de agregar detalle
  const handleOpenAddDetail = () => {
    if (productsAndServices.default) {
      setFormDataDetail({
        code: productAndServiceCodeClean(productsAndServices.default.code),
        quantity: 0,
        unit_price: productsAndServices.default.unit_price,
        description: productsAndServices.default.description,
        subtotal: 0,
      });
    } else {
      setFormDataDetail(initialStateInvoiceDetail);
    }
    onOpen();
  };
  const handleOpenSearchPS = () => {
    onOpenModalPS();
  };
  // Función para agregar un nuevo detalle de factura al estado
  const handleAddInvoiceDetail: HandleAddInvoiceDetailProps = (onClose) => {
    if (
      formDataDetail.quantity === 0 ||
      formDataDetail.unit_price === 0 ||
      formDataDetail.description === ""
    ) {
      toast.error("Por favor complete todos los campos", {
        duration: 4000,
      });
      focusFirstInput(codeInput);
      return;
    }
    // Si no se esta editando un detalle se agrega uno nuevo al estado de detalles de factura y al localstorage
    if (!isEditing.state) {
      setInvoiceDetails([...invoiceDetails, formDataDetail]);
      localStorage.setItem(
        `invoiceDetails${user.id}-${selectedBusiness.id}-${id}`,
        JSON.stringify([...invoiceDetails, formDataDetail])
      );
      toast.success("Detalle agregado correctamente", { duration: 4000 });
      setFormDataDetail(initialStateInvoiceDetail);
      focusFirstInput(codeInput);
      // Si se esta editando un detalle se edita el detalle en el estado de detalles de factura y en el localstorage
    } else if (isEditing.state && isEditing.index !== null) {
      const newInvoiceDetails = [...invoiceDetails];
      newInvoiceDetails[isEditing.index] = formDataDetail;
      setInvoiceDetails(newInvoiceDetails);
      localStorage.setItem(
        `invoiceDetails${user.id}-${selectedBusiness.id}-${id}`,
        JSON.stringify(newInvoiceDetails)
      );
      toast.success("Detalle editado correctamente", { duration: 4000 });
      setFormDataDetail(initialStateInvoiceDetail);
      setIsEditing({ state: false, index: null });
      onClose();
    }
  };
  // Función para enfocar el primer input del modal de agregar detalle
  const focusFirstInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  // Obtener los detalles de la factura del localstorage
  useEffect(() => {
    const data = localStorage.getItem(
      `invoiceDetails${user.id}-${selectedBusiness.id}-${id}`
    );

    if (data) {
      setInvoiceDetails(JSON.parse(data));
    } else {
      setInvoiceDetails([]);
    }
  }, [id, selectedBusiness, user.id]);

  // Función para manejar el cambio de los inputs del modal de agregar detalle
  const handleOnChangeDetail: HandleOnChangeDetailProps = (e) => {
    const { name, value } = e.target;

    setFormDataDetail({ ...formDataDetail, [name]: value });
  };
  // Función para editar una línea de detalle
  const handleEditInvoiceDetail: HandleWithIndexAndEventProps = (e, index) => {
    e.preventDefault();
    setFormDataDetail(invoiceDetails[index]);
    setIsEditing({ state: true, index });
    onOpen();
  };
  // Función para eliminar una línea de detalle
  const handleRemoveInvoiceDetail: HandleWithIndexAndEventProps = (
    e,
    index
  ) => {
    e.preventDefault();
    // Se elimina la línea de detalle del estado y del localstorage
    setInvoiceDetails(
      invoiceDetails.filter((detail, detailIndex) => detailIndex !== index)
    );
    localStorage.setItem(
      `invoiceDetails${user.id}-${selectedBusiness.id}-${id}`,
      JSON.stringify(
        invoiceDetails.filter((detail, detailIndex) => detailIndex !== index)
      )
    );
  };
  // Función para cerrar el modal de agregar detalle
  const handleCloseModal = (onClose: () => void) => {
    setFormDataDetail(initialStateInvoiceDetail);
    if (isEditing) {
      setIsEditing({ state: false, index: 0 });
    }
    onClose();
  };
  const handleCloseModalPS = (onClose: () => void) => {
    onClose();
  };
  useEffect(() => {
    if (searchPS.length > 0) {
      const searchLower = searchPS.toLowerCase(); // Convertimos el input a minúsculas
      const filtered = productsAndServices.all.filter(
        (PorS: DataProductsAndServicesProps) => {
          const nameMatch = PorS.name.toLowerCase().includes(searchLower);
          const descriptionMatch =
            PorS.description &&
            PorS.description.toLowerCase().includes(searchLower);
          const priceMatch =
            PorS.unit_price && PorS.unit_price.toString().includes(searchPS);
          const unitMatch =
            PorS.unit && PorS.unit.toLowerCase().includes(searchLower);
          const codeMatch =
            PorS.code && PorS.code.toLowerCase().includes(searchLower);
          return (
            nameMatch ||
            descriptionMatch ||
            priceMatch ||
            unitMatch ||
            codeMatch
          );
        }
      );

      if (filtered.length === 0) {
        return;
      }
      setFilteredProductsAndServices(filtered);
    } else {
      setFilteredProductsAndServices(productsAndServices.all);
    }
  }, [searchPS, productsAndServices.all]);
  const handleAddPStoDetail = (
    onClose: () => void,
    ps: DataProductsAndServicesProps
  ) => {
    setFormDataDetail({
      code: productAndServiceCodeClean(ps.code),
      quantity: 0,
      unit_price: ps.unit_price,
      description: ps.description,
      subtotal: 0,
    });
    onClose();
  };
  const handleSearchPS = (e: any) => {
    setSearchPS(e.target.value);
  };
  // Función para buscar el producto o servicio con el código ingresado y llenar los campos
  const handleOnBlurCode = () => {
    if (formDataDetail.code !== "") {
      const productOrService = productsAndServices.all.find(
        (productOrService: any) =>
          productOrService.code ===
          `${user.id}-${selectedBusiness.id}-${formDataDetail.code}`
      );
      if (productOrService) {
        setFormDataDetail({
          ...formDataDetail,
          description: productOrService.description,
          unit_price: productOrService.unit_price,
        });
      }
    }
  };
  // Función para limpiar el modal de agregar detalle de factura
  const handleEraseModal = () => {
    setFormDataDetail(initialStateInvoiceDetail);
    focusFirstInput(codeInput);
  };
  // Función para renderizar las celdas de la tabla de detalles de la factura
  const renderCell: RenderCellProps = (detail, columnKey, index) => {
    const cellValue = detail[columnKey as keyof InitialStateInvoiceDetailProps];

    switch (columnKey) {
      case "code":
        return <p>{detail.code}</p>;
      case "quantity":
        return <p className="text-right">{formatNumber(detail.quantity)}</p>;
      case "price":
        return <p className="text-right">{moneyFormat(detail.unit_price)}</p>;
      case "name":
        return <p>{nameOfProductOrService(detail.code)}</p>;

      case "description":
        return <p>{detail.description}</p>;
      case "subtotal":
        return <p className="text-right">{moneyFormat(detail.subtotal)}</p>;

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar detalle">
              <button
                onClick={(e) => handleEditInvoiceDetail(e, index)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditRowIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar detalle">
              <button
                onClick={(e) => handleRemoveInvoiceDetail(e, index)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
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
    createInvoiceDetail: {
      invoiceDetails,
      formDataDetail,
      handleOnChangeDetail,
      handleAddInvoiceDetail,
      handleOpenAddDetail,
      isOpen,
      onOpenChange,
      codeInput,
      quantityInput,
      renderCell,
      columnNames,
      handleCloseModal,
      handleOnBlurCode,
      handleEraseModal,
      isOpenModalPS,
      onOpenChangeModalPS,
      handleCloseModalPS,
      handleAddPStoDetail,
      handleOpenSearchPS,
      productsAndServices,
      handleSearchPS,
      searchPS,
      filteredProductsAndServices,
    },
  };
};
