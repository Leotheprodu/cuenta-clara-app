import { useInView } from "react-intersection-observer";
import { $LetterViewClient } from "@/stores/generalConfig";
import { useEffect, useState } from "react";

export const useLetterView = ({ username }: UseLetterViewProps) => {
  const [ref, inView] = useInView({ rootMargin: "-200px 300px" });
  const [letter, setLetter] = useState("");
  useEffect(() => {
    if (username && username.length > 0 && username[0] !== letter) {
      setLetter(username[0]);
    }
  }, [username, letter, inView]);
  useEffect(() => {
    $LetterViewClient.set({ letter, isClientView: inView });
    /*  if (username && username[0] === letter) {
      $LetterViewClient.set({ letter, isClientView: false });
    } else if (username && username[0] !== letter) {
      $LetterViewClient.set({ letter, isClientView: true });
    } */
  }, [inView, letter, username]);

  return {
    ref,
  };
};
