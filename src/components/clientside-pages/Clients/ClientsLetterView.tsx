import { $LetterViewClient } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { motion, AnimatePresence } from "framer-motion";

export const ClientsLetterView = () => {
  const letterViewClient = useStore($LetterViewClient);
  return (
    <AnimatePresence>
      {letterViewClient.isClientView && (
        <motion.div
          style={{ pointerEvents: "none" }}
          className="fixed bottom-1/2 font-bold text-9xl gradient-text"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [1, 0], scale: [1, 0] }}
          exit={{ opacity: [1, 0], scale: [1, 0] }}
          transition={{ duration: 2 }}
        >
          <p>{letterViewClient.letter.toUpperCase()}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
