interface Invoice {
  id: number;
  parent_user_id: number;
  client_id: number;
  total_amount: number;
  paid: boolean;
  business_id: Number;
  date: string;
}
