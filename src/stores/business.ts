import { atom } from "nanostores";
interface SelectedBusinessProps {
  id: number;
  name: string;
}
export type PropsSelectedBusiness = SelectedBusinessProps;
export const $selectedBusiness = atom<PropsSelectedBusiness>({
  id: 0,
  name: "",
});
