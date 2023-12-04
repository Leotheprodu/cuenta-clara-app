import { motion } from "framer-motion";

export const MotionAddButtonLink = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: { delay },
    }}
    exit={{ opacity: 0, x: 20 }}
    className="px-1 py-2 flex gap-2 items-center active:text-terciario ease-linear duration-200 rounded-lg p-1"
  >
    {children}
  </motion.div>
);
