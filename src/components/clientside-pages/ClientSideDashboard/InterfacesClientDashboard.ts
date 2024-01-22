interface ClientDashboardPaymentMethod {
  id: number;
  name: string;
}

interface ClientDashboardUserPaymentMethod {
  id: number;
  payment_method_full_name: string;
  payment_method_cellphone: string | null;
  payment_method_iban: string;
  payment_method_email: string;
  payment_method_description: string;
  payment_method: PaymentMethod;
}

interface ClientDashboardUsersBusiness {
  id: number;
  name: string;
  user_payment_methods: ClientDashboardUserPaymentMethod[];
  user: ClientDashboardUser;
}
interface ClientDashboardUser {
  id: number;
  username: string;
  email: string;
  cellphone: string;
  country: string;
}
interface ClientDashboardBalance {
  id: number;
  amount: string;
  users_business: ClientDashboardUsersBusiness;
}

interface ClientDashboardClient {
  id: number;
  username: string;
  email: string;
  cellphone: string | null;
  active: boolean;
  country: string;
  user_id: number | null;
}

interface ClientDashboardData {
  client: ClientDashboardClient;
  balances: ClientDashboardBalance[];
}

interface TransactionsInvoiceDashboard {
  id: number;
  status: string;
  total_amount: number;
  transactions: Transaction[];
}
