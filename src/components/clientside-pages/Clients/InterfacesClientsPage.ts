interface LettersFilterProps {
    handle: {
        HandleLetterFilter: (letter: string) => void;
        letterSelected: string;
    };
}
interface ClientProps {
    id: number;
    username: string;
    email: string | null;
    cellphone: number;
    token: string;
    user_id: number | null;
    activo: boolean;
    createdAt: string;
    updatedAt: string;
}
interface ClientCardProps {
    client: {
        id: number;
        username: string;
        email: string | null;
        cellphone: number;
        token: string;
        user_id: number | null;
        activo: boolean;
        createdAt: string;
        updatedAt: string;
    };
}