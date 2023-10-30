import { motion, AnimatePresence } from "framer-motion";

export const ClientsLetterView = ({
    letterViewClient,
}: letterViewClientProps) => {
    return (
        <AnimatePresence>
            {letterViewClient.isClientView && (
                <motion.div
                    style={{ pointerEvents: "none" }}
                    className="fixed bottom-1/2 font-bold text-9xl text-primario"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0] }}
                    exit={{ opacity: [1, 0] }}
                    transition={{ duration: 1 }}
                >
                    <p>{letterViewClient.letter}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
