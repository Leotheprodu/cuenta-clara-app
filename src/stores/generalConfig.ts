import { atom } from "nanostores";

export const $isCheckingSession = atom(false);
export const $LetterViewClient = atom({ letter: "", isClientView: false });
