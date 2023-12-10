import Loading from "@/app/loading";
import { AnimatePresence, motion } from "framer-motion";
import { useDragableClient } from "./useDragableClient";

export const DragableClient = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const { handleDragEnd, isRedirecting } = useDragableClient({ id });

  return (
    <div>
      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
          whileDrag={{ scale: 1.2 }}
          onDragEnd={handleDragEnd}
          className=" flex flex-col z-0 rounded-xl border-1 bg-blanco bg-opacity-50 border-secundario/10 p-2 w-[20rem] shadow-sm shadow-cuaternario/40"
        >
          {children}
        </motion.div>
        <AnimatePresence>{isRedirecting && <Loading />}</AnimatePresence>
      </div>
    </div>
  );
};
