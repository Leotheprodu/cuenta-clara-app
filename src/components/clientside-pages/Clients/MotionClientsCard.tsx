import { motion } from "framer-motion";

export const MotionClientsCard = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <motion.div
        /* initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }} */
        className=""
    >
        {children}
    </motion.div>
);
