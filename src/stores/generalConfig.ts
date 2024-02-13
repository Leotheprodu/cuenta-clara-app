import { atom } from "nanostores";
interface LetterViewClientProps {
  letter: string;
  isClientView: boolean;
}
interface AppStateProps {
  isCreatedInvoice: boolean;
  client_id: number;
  client_name: string;
}
interface GlobalLoadingProps {
  isLoading: boolean;
  message: string;
}
export type PropsGlobalLoading = GlobalLoadingProps;
export type PropsLetterView = LetterViewClientProps;
export type PropsAppState = AppStateProps;
export const $GlobalLoading = atom<PropsGlobalLoading>({
  isLoading: true,
  message: "Cargando...",
});
export const $LetterViewClient = atom<PropsLetterView>({
  letter: "",
  isClientView: false,
});

export const $AppState = atom<PropsAppState>({
  isCreatedInvoice: false,
  client_id: 0,
  client_name: "",
});

export const $internalLinkName = atom<string>("");
export const $refetchBusinessHeader = atom<boolean>(false);
