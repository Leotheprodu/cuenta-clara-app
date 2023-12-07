import { appName } from "@/data/constants";
import Image from "next/image";
import { Waves } from "@/components/layout/svgResources/waves";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
export const Features = () => {
  return (
    <section className="w-full snap-center flex flex-col sm:flex-row h-screen overflow-hidden">
      <div className="sm:w-1/2 relative bg-terciario flex items-center">
        <Image
          width={1200}
          height={800}
          src={"/phone1.png"}
          alt="vista en celular"
          className=""
        ></Image>
      </div>
      <div className="px-2 bg-terciario sm:w-1/2 flex flex-col items-center justify-center gap-10">
        <h1 className="text-blanco text-6xl p-1 sm:p-5 font-semibold">
          Con <span className="text-secundario uppercase">{appName}</span>{" "}
          Puedes
        </h1>
        <ul className="text-secundario text-2xl p-1 sm:p-5 flex flex-col justify-center gap-3 ">
          <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario h-10 w-full">
            Registrar y contactar rapidamente tus clientes
          </li>
          <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario h-10 w-full">
            Controlar tu inventario
          </li>
          <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario h-10 w-full">
            Registrar facturas y transacciones de tus clientes
          </li>
          <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario h-10 w-full">
            Controlar los saldos de tus clientes
          </li>
          <li className="bg-gradient-to-r p-1 rounded-md from-cuaternario to-terciario h-10 w-full">
            Consultar tus ventas
          </li>
        </ul>
      </div>
    </section>
  );
};
