import { atom } from "nanostores";

interface ToastTypes {
    message: string;
    type: "error" | "loading" | "success" | "warning" | "dismiss";
}

export type GobalMessages = ToastTypes;
export const $toastGlobal = atom<GobalMessages>({
    message: "",
    type: "dismiss",
});
