import { ClientSections } from "./ClientSections";
import { MainContactInfo } from "./MainContactInfo";

export const ClientCard = ({ client }: ClientCardProps) => {
    const { username, id } = client;

    return (
        <div className="flex flex-col justify-between w-full">
            <div>
                <div className="flex justify-between">
                    <h2 className="font-bold">{username}</h2>
                    <span className="text-xs opacity-70">id: {id}</span>
                </div>

                <MainContactInfo client={client} />
            </div>
            <ClientSections client={client} />
        </div>
    );
};
