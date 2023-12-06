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
  amount: string;
}
interface UserMessage {
  message: string;
}

interface UserData {
  isLoggedIn: boolean;
  user: User;
  roles: number[];
  client: Client[];
  balance: number;
  userMessage: UserMessage;
}
interface Client {
  id: number;
  parent_user_id: number;
  balance: Balance;
}

export type IsLoggedInValue = UserData;
export const $user = atom<IsLoggedInValue>({
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
      balance: {
        amount: "0.00",
      },
    },
  ],
  balance: 0,
  userMessage: {
    message: "",
  },
});
