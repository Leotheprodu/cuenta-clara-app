interface BusinessProps {
  id: number;
  name: string;
  default: boolean;
  user_id: number;
}

interface HeaderBusinessSelectorProps {
  handle: {
    business: BusinessProps[];
    isLoadingBusiness: boolean;
    handleSelectionBusiness: (e: any) => void;
    value: Set<string>;
    isPending: boolean;
    mutateFunction: () => void;
    path: string;
    balance: string;
    handleShowBalance: () => void;
    showBalance: boolean;
  };
}
