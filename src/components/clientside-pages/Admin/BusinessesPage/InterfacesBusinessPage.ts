interface InterfacesBusinessPage {
  id: number;
  name: string;
  default: boolean;
  user_id: number;
  active: boolean;
}
interface CreateBusinessDataProps {
  CreateBusinessData: {
    name: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnClear: (name: string) => void;
    handleCreateBusiness: (e: React.FormEvent<HTMLFormElement>) => void;
    isPendingCreateBusiness: boolean;
  };
}
