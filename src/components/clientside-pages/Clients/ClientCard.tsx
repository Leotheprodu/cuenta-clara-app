import { ClientSections } from "./ClientSections";
import { MainContactInfo } from "./MainContactInfo";

export const ClientCard = ({ client, isSelected }: ClientCardProps) => {
    const { username, id } = client;

    return (
        <div
            className={`flex flex-col justify-between w-full p-2 rounded-xl ${
                isSelected ? "bg-blanco" : "bg-primario/10"
            }`}
        >
            <div>
                <div className="flex gap-1 items-center">
                    <h2 className="font-bold">{username}</h2>
                    <span className="text-xs opacity-70">id: {id}</span>
                </div>

                <MainContactInfo isSelected={isSelected} client={client} />
            </div>
            <ClientSections isSelected={isSelected} client={client} />
        </div>
    );
};
