import { atom } from "nanostores";
interface LetterViewClientProps {
  letter: string;
  isClientView: boolean;
}
interface AppStateProps {
  isCreatedInvoice: boolean;
  page: string;
  client_id: number;
}

export type PropsLetterView = LetterViewClientProps;
export type PropsAppState = AppStateProps;
export const $isCheckingSession = atom(false);
export const $LetterViewClient = atom<PropsLetterView>({
  letter: "",
  isClientView: false,
});

export const $AppState = atom<PropsAppState>({
  isCreatedInvoice: false,
  page: "",
  client_id: 0,
});
