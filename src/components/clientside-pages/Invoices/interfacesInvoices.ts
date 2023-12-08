interface UserBusiness {
  id: number;
  name: string;
}

interface Client {
  id: number;
  username: string;
}

interface InvoiceDetail {
  id: number;
  quantity: string;
  unit_price: string;
  subtotal: string;
  code: string;
}

interface PaymentMethod {
  id: number;
  name: string;
}

interface PaymentStatus {
  id: number;
  name: string;
}

interface Transaction {
  id: string;
  amount: string;
  description: string;
  date: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
}
type InvoiceStatus = "paid" | "pending" | "cancelled" | "inReview";
interface Invoice {
  id: number;
  total_amount: number;
  status: InvoiceStatus;
  date: string;
  users_business: UserBusiness;
  client: Client;
  invoice_details: InvoiceDetail[];
  transactions: Transaction[];
}
