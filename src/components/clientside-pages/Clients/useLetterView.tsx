import { useInView } from "react-intersection-observer";
import { $LetterViewClient } from "@/stores/generalConfig";
import { useEffect, useState } from "react";

export const useLetterView = ({ username }: UseLetterViewProps) => {
  const [ref, inView] = useInView({ rootMargin: "-300px 300px" });
  const [letter, setLetter] = useState("");
  useEffect(() => {
    username && setLetter(username[0]);
  }, [username]);
  useEffect(() => {
    $LetterViewClient.set({ letter, isClientView: inView });
  }, [inView, letter]);

  return {
    ref,
  };
};
