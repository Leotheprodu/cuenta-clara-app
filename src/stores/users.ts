import { atom } from "nanostores";
interface User {
  id: number;
  username: string;
  email: string;
  cellphone: string;
  active: boolean;
  country: string;
  createdAt: string;
  updatedAt: string;
}
interface Balance {
  id: number;
  amount: string;
  users_business: UserBusiness;
}
interface UserMessage {
  message: string;
}

interface Client {
  id: number;
  parent_user_id: number;
  balances: Balance[];
}
interface UserData {
  isLoggedIn: boolean;
  user: User;
  roles: number[];
  client: Client[];
  balance: number;
  userMessage: UserMessage;
}

export type UserProps = UserData;
export const $user = atom<UserProps>({
  isLoggedIn: false,
  user: {
    id: 0,
    username: "",
    email: "",
    cellphone: "",
    active: false,
    country: "",
    createdAt: "",
    updatedAt: "",
  },
  roles: [],
  client: [
    {
      id: 0,
      parent_user_id: 0,
      balances: [
        {
          id: 0,
          amount: "0.00",
          users_business: {
            id: 0,
            name: "",
          },
        },
      ],
    },
  ],
  balance: 0,
  userMessage: {
    message: "",
  },
});
