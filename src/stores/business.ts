import { balanceTypesDefault, paymentMethodsDefault } from "@/data/constants";
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

interface BalanceRechargeInfoProps {
  payment_method: PaymentInfo;
  balanceType: BalanceTypes;
  balanceRechargeId: number;
}
export type PropsBalanceRechargeInfo = BalanceRechargeInfoProps;
export const $balanceRechargeInfo = atom<PropsBalanceRechargeInfo>({
  payment_method: paymentMethodsDefault,
  balanceType: balanceTypesDefault,
  balanceRechargeId: 0,
});
