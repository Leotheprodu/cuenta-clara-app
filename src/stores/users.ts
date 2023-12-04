import { atom } from "nanostores";
interface User {
  id: number;
  username: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserMessage {
  message: string;
}

interface ApiResponse {
  isLoggedIn: boolean;
  user: User;
  roles: number[];
  client: Client;
  balance: number;
  userMessage: UserMessage;
}
interface Client {
  id: number;
  username: string;
  email: string;
  cellphone: string;
  token: string;
  pin: null | string;
  active: boolean;
  country: string;
  detail: null | string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  parent_user_id: number;
}

export type IsLoggedInValue = ApiResponse;
export const $user = atom<IsLoggedInValue>({
  isLoggedIn: true,
  user: {
    id: 0,
    username: "",
    email: "",
    active: false,
    createdAt: "",
    updatedAt: "",
  },
  roles: [],
  client: {
    id: 0,
    username: "",
    email: "",
    cellphone: "",
    token: "",
    pin: "",
    active: false,
    country: "",
    detail: "",
    createdAt: "",
    updatedAt: "",
    user_id: 0,
    parent_user_id: 0,
  },
  balance: 0,
  userMessage: { message: "" },
});
