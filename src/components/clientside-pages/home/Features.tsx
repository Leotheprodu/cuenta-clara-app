import { appName } from "@/data/constants";
import Image from "next/image";
import { Waves } from "@/components/layout/svgResources/waves";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
export const Features = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.2], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  return (
    <section
      ref={targetRef}
      className="bg-terciario overflow-hidden sm:h-[300vh] relative"
    >
      <motion.div
        style={{ opacity, y }}
        className="flex flex-col w-full sm:flex-row sm:fixed top-10 sm:top-1/4"
      >
        <div className="sm:w-1/2 flex items-center sm:items-start justify-center sm:justify-start">
          <Image
            width={1200}
            height={800}
            src={"/phone1.png"}
            alt="vista en celular"
            className=""
            priority
          ></Image>
        </div>
        <div className="px-2sm:w-1/2 flex flex-col gap-10">
          <h1 className="text-blanco text-center sm:text-left text-6xl p-1 sm:p-5 font-semibold">
            Con <span className="text-secundario uppercase">{appName}</span>{" "}
            Puedes
          </h1>
          <ul className="text-secundario text-2xl text-center sm:text-left p-1 sm:p-5 flex flex-col justify-center gap-3 ">
            <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario w-full">
              Registrar y contactar rapidamente tus clientes
            </li>
            <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario w-full">
              Controlar tu inventario
            </li>
            <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario w-full">
              Registrar facturas y transacciones de tus clientes
            </li>
            <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario w-full">
              Controlar los saldos de tus clientes
            </li>
            <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario w-full">
              Consultar tus ventas
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};
