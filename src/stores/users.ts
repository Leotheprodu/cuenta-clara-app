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
    userMessage: UserMessage;
}

export type IsLoggedInValue = ApiResponse;
export const $user = atom<IsLoggedInValue>({
    isLoggedIn: false,
    user: {
        id: 0,
        username: "",
        email: "",
        active: false,
        createdAt: "",
        updatedAt: "",
    },
    roles: [],
    userMessage: { message: "" },
});
