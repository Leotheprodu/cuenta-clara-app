import { useState, useEffect } from "react";
import {
  formatDate,
  formatNumber,
  moneyFormat,
} from "@/components/Utils/dataFormat";
import { paymentStatus } from "@/data/constants";
import { productAndServiceCodeClean } from "@/components/Utils/productAndServiceCodeClean";

export const useInvoiceDetailsModal = ({ invoice }: { invoice: Invoice }) => {
  const { invoice_details } = invoice;
  const columnNames = [
    { key: "id", name: "Id" },
    { key: "code", name: "Codigo" },
    { key: "name", name: "Nombre" },
    { key: "type", name: "Tipo de Producto" },
    { key: "unit", name: "Unidad" },
    { key: "quantity", name: "Cantidad" },
    { key: "unit_price", name: "Precio" },
    { key: "subtotal", name: "Subtotal" },
  ];

  const [totalDetails, setTotalDetails] = useState(0);
  useEffect(() => {
    const total = invoice_details.reduce(
      (acc: number, invoiceDetail: InvoiceDetail) => {
        return acc + parseFloat(invoiceDetail.subtotal);
      },
      0
    );
    setTotalDetails(total);
  }, [invoice_details]);
  const renderCell = (
    invoiceDetail: InvoiceDetail,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "id":
        return (
          <div className="flex justify-center">
            <small className="text-center">{invoiceDetail.id}</small>
          </div>
        );
      case "code":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {productAndServiceCodeClean(invoiceDetail.code)}
            </small>
          </div>
        );
      case "name":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {invoiceDetail.products_and_service.name}
            </small>
          </div>
        );
      case "type":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {invoiceDetail.products_and_service.type}
            </small>
          </div>
        );
      case "unit":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {invoiceDetail.products_and_service.unit}
            </small>
          </div>
        );
      case "quantity":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {formatNumber(parseInt(invoiceDetail.quantity))}
            </small>
          </div>
        );
      case "unit_price":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {moneyFormat(parseInt(invoiceDetail.unit_price))}
            </small>
          </div>
        );
      case "subtotal":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {moneyFormat(parseInt(invoiceDetail.subtotal))}
            </small>
          </div>
        );
      default:
        return <small>Columna Invalida</small>;
    }
  };
  return {
    handle: {
      columnNames,
      renderCell,
      totalDetails,
    },
  };
};
