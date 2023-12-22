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
  description: string;
  unit_price: string;
  subtotal: string;
  code: string;
  products_and_service: Products_and_service;
}

interface PaymentMethod {
  id: number;
  name: string;
}
type PaymentStatusName = "completed" | "pending" | "cancelled";

interface PaymentStatus {
  id: number;
  name: PaymentStatusName;
}

interface Transaction {
  id: string;
  amount: string;
  description: string;
  date: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
}
interface Products_and_service {
  id: number;
  name: string;
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

interface handleTransactionsProps {
  handleTransactions: {
    invoice: Invoice;
    refetchInvoices: () => void;
  };
  onClose: () => void;
}
