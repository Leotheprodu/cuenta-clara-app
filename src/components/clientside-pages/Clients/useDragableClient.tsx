import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { internalLinks } from "@/components/Utils/internalLinks";

export const useDragableClient = ({ id }: { id: number }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [dragXPosition, setDragXPosition] = useState("");
  useEffect(() => {
    if (dragXPosition === "agregar factura") {
      setIsRedirecting(true);
      redirect(`${internalLinks("add-invoice")}${id}`);
    } else if (dragXPosition === "ver facturas del cliente") {
      setIsRedirecting(true);
      redirect(`${internalLinks("client-invoices")}${id}`);
    }
  }, [dragXPosition, id]);

  const handleDragEnd = (event: any, info: any) => {
    // Verifica si el elemento se soltó en un área específica
    if (info.point.x > 740) {
      setDragXPosition("agregar factura");
    } else if (info.point.x < 650) {
      setDragXPosition("ver facturas del cliente");
    }
  };
  return { handleDragEnd, isRedirecting };
};
