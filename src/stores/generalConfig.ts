import { atom } from "nanostores";
interface LetterViewClientProps {
    letter: string;
    isClientView: boolean;
}

export type PropsLetterView = LetterViewClientProps;

export const $isCheckingSession = atom(false);
export const $LetterViewClient = atom<PropsLetterView>({
    letter: "",
    isClientView: false,
});
