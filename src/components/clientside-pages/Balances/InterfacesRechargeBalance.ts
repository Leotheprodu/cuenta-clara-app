interface BalanceTypes {
  id: number;
  name: string;
  price: number;
  balance: number;
  extra: number;
}
interface PaymentInfo {
  id: number;
  payment_method_full_name: string;
  payment_method_cellphone: string;
  payment_method_iban: string;
  payment_method_email: string;
  payment_method_description: string;
  payment_method: {
    id: number;
    name: string;
  };
  users_business: {
    id: number;
    name: string;
    user_id: number;
  };
}
