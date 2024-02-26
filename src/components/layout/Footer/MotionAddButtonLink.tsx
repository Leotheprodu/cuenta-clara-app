import { motion } from "framer-motion";

export const MotionAddButtonLink = ({
  children,
  delay,
  disabled = false,
}: {
  children: React.ReactNode;
  delay: number;
  disabled?: boolean;
}) => (
  <>
    {!disabled && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay },
        }}
        exit={{ opacity: 0, x: 20 }}
      >
        {children}
      </motion.div>
    )}
  </>
);
