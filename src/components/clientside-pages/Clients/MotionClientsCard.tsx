import { motion } from "framer-motion";

export const MotionClientsCard = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 10 }}
        exit={{ opacity: 0, x: 40 }}
        className="flex flex-col rounded-xl border-1 border-gris shadow-md"
    >
        {children}
    </motion.div>
);
