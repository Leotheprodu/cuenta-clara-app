import { appName } from "@/data/constants";
import Image from "next/image";
import { Waves } from "@/components/layout/svgResources/waves";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 2000]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="bg-primario w-full flex flex-col sm:flex-row top-12 pt-[5rem] h-screen overflow-hidden"
    >
      <motion.div className="px-2 sm:w-1/3 flex flex-col items-center justify-center gap-10">
        <motion.h1
          animate={{ scale: [0, 1.1, 1], opacity: [0, 0.5, 1] }}
          transition={{ duration: 1 }}
          className="text-blanco text-6xl text-center p-1 sm:p-5 font-semibold"
        >
          Tu <span className="gradient-text">negocio</span> siempre a mano
        </motion.h1>
        <motion.h2
          animate={{ scale: [0, 1.1, 1], opacity: [0, 0.5, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-blanco/75 text-xl text-center p-1 sm:p-5"
        >
          <span className="gradient-text uppercase">{appName}</span> mejora la
          experiencia de tus clientes, permitiendo consultar sus facturas y
          realizar pagos
        </motion.h2>
      </motion.div>
      <motion.div style={{ x }} className="sm:w-2/3 relative">
        <Waves className="absolute top-0 scale-105" />
        <Image
          width={1200}
          height={800}
          src={"/desk1.png"}
          alt="vista en computadora"
          className=""
        ></Image>
        <Waves className="absolute bottom-0 rotate-180 scale-105" />
      </motion.div>
    </motion.section>
  );
};
