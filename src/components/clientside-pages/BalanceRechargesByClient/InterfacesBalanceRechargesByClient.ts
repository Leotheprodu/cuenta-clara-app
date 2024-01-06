interface DataRechargesBalanceByClientProps {
  id: number;
  amount: number;
  balance_amount: number;
  status: paymentStatus;
  createdAt: string;
  updatedAt: string;
  balances_type: {
    id: number;
    name: string;
  };
  client: {
    id: number;
    username: string;
    cellphone: string;
    token: string;
    email: string;
  };
  balance: {
    id: number;
    amount: string;
  };
  user_payment_method: {
    id: number;
    payment_method_full_name: string;
    payment_method_cellphone: string | null;
    payment_method_iban: string;
    payment_method_email: string | null;
    payment_method_description: string;
    payment_method: {
      id: number;
      name: string;
    };
  };
}
