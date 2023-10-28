interface ClientProps {
    id: number;
    username: string;
    email: string | null;
    cellphone: string;
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
        cellphone: string;
        token: string;
        user_id: number | null;
        activo: boolean;
        balance?: number;
        createdAt: string;
        updatedAt: string;
    };
    isShowActivoButton: boolean;
}
interface FilterClientsProps {
    data: any[];
    status: string;
    isShowActivoButton: boolean;
    dataBalances: any[];
}
