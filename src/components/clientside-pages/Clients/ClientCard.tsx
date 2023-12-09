import { ClientSections } from "./ClientSections";
import { MainContactInfo } from "./MainContactInfo";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { useClientCard } from "./useClientCard";
import { InfoIcon } from "@/icons/infoIcon";
import { Tooltip } from "@nextui-org/react";
export const ClientCard = ({ client, isShowActivoButton }: ClientCardProps) => {
  const { username, id, detail = "", balances } = client;
  const balance = parseInt(balances[0].amount, 10);
  const { ref } = useClientCard({ username });
  return (
    <div
      ref={ref}
      className={`flex z-0 flex-col rounded-xl ${
        isShowActivoButton ? "bg-primario/10" : "bg-danger-400/10"
      } ${balance < 0 && "border-t-2 border-danger-400 bg-danger-400/5"} ${
        balance > 0 && "border-t-2 border-cuaternario"
      }`}
    >
      <div className="z-0">
        <div className="relative flex flex-col justify-center items-center">
          <h2 className="font-bold text-2xl">{username}</h2>
          {detail?.length > 0 && (
            <>
              <Tooltip
                content={detail}
                showArrow
                placement="bottom"
                color="primary"
              >
                <div className="text-secundario/50 absolute right-1 top-1">
                  <InfoIcon className="w-6 h-6" />
                </div>
              </Tooltip>
            </>
          )}
          <span className="text-xs opacity-70">id: {id}</span>
        </div>
        <ClientSections
          isShowActivoButton={isShowActivoButton}
          client={client}
        />
        <MainContactInfo
          isShowActivoButton={isShowActivoButton}
          client={client}
        />
      </div>
      <div
        className={`flex relative gap-2 border-x-1 border-b-1 justify-center border-terciario w-full rounded-b-xl bg-secundario px-2 py-1 rounded-sm`}
      >
        <h3 className="text-terciario absolute left-2">Saldo:</h3>
        <div>
          <p
            className={`text-blanco ${
              balance < 0 && "text-danger-400"
            } font-sans text-xl text-center w-full`}
          >
            {moneyFormat(balance)}
          </p>
        </div>
      </div>
    </div>
  );
};
