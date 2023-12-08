import Loading from "@/app/loading";
import { internalLinks } from "@/components/Utils/internalLinks";
import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const DragableClient = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
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

  // eslint-disable-next-line
  const handleDragEnd = (event: any, info: any) => {
    // Verifica si el elemento se soltó en un área específica
    if (info.point.x > 900) {
      setDragXPosition("agregar factura");
    } else if (info.point.x < 330) {
      setDragXPosition("ver facturas del cliente");
    }
  };
  return (
    <div>
      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
          whileDrag={{ scale: 1.2 }}
          onDragEnd={handleDragEnd}
          className=" flex flex-col z-0 rounded-2xl border-1 bg-blanco border-secundario p-2 w-[20rem] shadow-md"
        >
          {children}
        </motion.div>
        <AnimatePresence>{isRedirecting && <Loading />}</AnimatePresence>
      </div>
    </div>
  );
};
