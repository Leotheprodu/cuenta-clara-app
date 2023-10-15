import { ClientSections } from "./ClientSections";
import { MainContactInfo } from "./MainContactInfo";

export const ClientCard = ({ client }: ClientCardProps) => {
    const { username } = client;

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h2 className="font-bold">{username}</h2>
                <MainContactInfo client={client} />
            </div>
            <ClientSections client={client} />
        </div>
    );
};
