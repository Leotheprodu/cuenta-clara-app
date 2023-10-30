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
interface whatsappMsgsNames {
    name: "justContact" | "sendDashboardLink";
}
interface ClientProps {
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
}
interface ClientCardProps {
    client: ClientProps;
    isShowActivoButton: boolean;
}
interface FilterClientsProps {
    data: any[];
    status: string;
    isShowActivoButton: boolean;
    dataBalances: any[];
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
