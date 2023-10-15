import { motion } from "framer-motion";
import { LettersFilterProps } from "./InterfacesClientsPage";

export const LettersFilter = ({ handle }: LettersFilterProps) => {
    const { HandleLetterFilter, letterSelected } = handle;
    const letters = "abcdefghijklmnñopqrstuvwxyz".split("");

    return (
        <div className="flex flex-col gap-2 fixed top-5 right-2">
            {letters.map((letter) => (
                <button
                    className={`relative rounded-full w-3 h-3 flex justify-center items-center uppercase`}
                    key={letter}
                    onClick={() => HandleLetterFilter(letter)}
                >
                    {letterSelected === letter && (
                        <motion.span
                            layoutId="letteLine"
                            className="absolute right-full top-0 block w-[.3rem] h-full rounded-full bg-primario"
                        />
                    )}
                    <div>{letter}</div>
                </button>
            ))}
        </div>
    );
};
