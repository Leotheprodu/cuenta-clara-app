import { ClientSections } from "./ClientSections";
import { MainContactInfo } from "./MainContactInfo";
import { moneyFormat } from "@/components/Utils/MoneyFormat";
import { useInView } from "react-intersection-observer";
import { $LetterViewClient } from "@/stores/generalConfig";
import { useEffect } from "react";
export const ClientCard = ({ client, isShowActivoButton }: ClientCardProps) => {
    const { username, id, balance = 0 } = client;
    const [ref, inView] = useInView({ rootMargin: "-300px 300px" });
    const letter = inView ? username[0] : "";
    useEffect(() => {
        $LetterViewClient.set({ letter, isClientView: inView });
    }, [inView, letter]);

    return (
        <div
            ref={ref}
            className={`flex flex-col w-full p-2 rounded-xl ${
                isShowActivoButton ? "bg-blanco" : "bg-primario/10"
            } ${balance < 0 && "border-2 border-danger-400"} ${
                balance > 0 && "border-1 border-success-400"
            }`}
        >
            <div>
                <div className="flex gap-1 items-center">
                    <h2 className="font-bold">{username}</h2>
                    <span className="text-xs opacity-70">id: {id}</span>
                </div>
                <MainContactInfo
                    isShowActivoButton={isShowActivoButton}
                    client={client}
                />
            </div>
            <div
                className={`flex gap-2 w-full bg-gris px-2 py-1 rounded-sm ${
                    balance < 0 && "text-danger-400"
                }`}
            >
                <h3>Saldo:</h3>
                <div>
                    <p className={``}>{moneyFormat(balance, "CRC", "es-CR")}</p>
                </div>
            </div>
            <ClientSections
                isShowActivoButton={isShowActivoButton}
                client={client}
            />
        </div>
    );
};
