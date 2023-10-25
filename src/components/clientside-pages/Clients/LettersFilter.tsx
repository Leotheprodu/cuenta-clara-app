import { motion } from "framer-motion";

export const LettersFilter = ({ handle }: LettersFilterProps) => {
    const { HandleLetterFilter, letterSelected } = handle;
    const letters = "abcdefghijklmnñopqrstuvwxyz".split("");

    return (
        <div className="flex fixed inset-y-0 right-2 items-center justify-center mt-6">
            <div className="flex flex-col gap-1 ">
                {letters.map((letter) => (
                    <button
                        className={`relative rounded-full w-3 h-3 flex justify-center items-center uppercase`}
                        key={letter}
                        onClick={() => HandleLetterFilter(letter)}
                    >
                        {letterSelected === letter && (
                            <motion.span
                                layoutId="letteLine"
                                className="absolute bottom-[-1px] block w-full h-[.1rem] rounded-full bg-terciario"
                            />
                        )}
                        <div className="text-sm">{letter}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
