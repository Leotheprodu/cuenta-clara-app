interface whatsappMsgsNames {
  name:
    | "justContact"
    | "sendDashboardLink"
    | "sendRechargeBalanceComprobant"
    | "ContactClientInvoice";
}
type UseLetterViewProps = {
  username: string;
};
interface ClientProps {
  id: number;
  username: string;
  email: string | "";
  cellphone: string;
  token: string;
  user_id: number | null;
  parent_user_id: number | null;
  active: boolean;
  country: string;
  address: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  balances: BalanceProps[];
}
interface BalanceProps {
  id: number;
  amount: string;
  users_business: UsersBusinessProps;
}
interface UsersBusinessProps {
  id: number;
  name: string;
}
interface ClientCardProps {
  client: ClientProps;
  isShowActivoButton: boolean;
}
interface FilterClientsProps {
  data: ClientProps[];
  status: string;
  isShowActivoButton: boolean;
  searchClient: string;
}
interface HeaderClientsProps {
  handle: {
    isShowActivoButton: boolean;
    HanldeIsSelected: (value: boolean) => void;
    handleSearchClient: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchClient: string;
  };
}
interface letterViewClientProps {
  letterViewClient: {
    letter: string;
    isClientView: boolean;
  };
}
