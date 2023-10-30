import { useInView } from "react-intersection-observer";
import { $LetterViewClient } from "@/stores/generalConfig";
import { useEffect, useState } from "react";
type UseClientCardProps = {
    username: string;
};
export const useClientCard = ({ username }: UseClientCardProps) => {
    const [ref, inView] = useInView({ rootMargin: "-300px 300px" });
    const [letter, setLetter] = useState("");
    useEffect(() => {
        setLetter(username[0]);
    }, [username]);
    useEffect(() => {
        $LetterViewClient.set({ letter, isClientView: inView });
    }, [inView, letter]);

    return {
        ref,
    };
};
