import { ClientSections } from "./ClientSections";
import { MainContactInfo } from "./MainContactInfo";
import { moneyFormat } from "@/components/Utils/dataFormat";

import { InfoIcon } from "@/icons/infoIcon";
import { Tooltip } from "@nextui-org/react";
import { useLetterView } from "./useLetterView";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const ClientCard = ({ client, isShowActivoButton }: ClientCardProps) => {
  const { username, id, detail = "", balances } = client;
  const businessId = useStore($selectedBusiness);
  const [balance, setBalance] = useState<number>(0);
  const handleInfoClick = () => {
    toast.success(detail);
  };
  useEffect(() => {
    if (balances.length > 0) {
      const balancesByBusiness = balances?.filter(
        (balance) => balance.users_business.id === businessId.id
      );
      setBalance(parseFloat(balancesByBusiness[0]?.amount) || 0);
      /* setBalance(parseFloat(balancesByBusiness[0].amount)); */
    }
  }, [balances, businessId]);

  const { ref } = useLetterView({ username });
  return (
    <div
      ref={ref}
      className={`w-[20rem] flex z-0 flex-col rounded-xl ${
        isShowActivoButton ? "bg-blanco" : "bg-foreground-300"
      } ${balance < 0 && "border-t-2 border-danger-100"} ${
        balance > 0 && "border-t-2 border-cuaternario"
      }`}
    >
      <div className="z-0 sm:h-[15rem]">
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
                <button
                  onClick={handleInfoClick}
                  className="text-secundario/50 absolute right-1 top-1"
                >
                  <InfoIcon className="w-6 h-6" />
                </button>
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
        className={`flex relative gap-2 justify-center items-center w-full rounded-b-xl bg-slate-100 px-2 py-1 rounded-sm`}
      >
        <h3 className=" absolute left-2 text-slate-500">Saldo:</h3>
        <div>
          <p
            className={` ${
              balance < 0 && "text-danger-400"
            } text-2xl text-center w-full`}
          >
            {moneyFormat(balance)}
          </p>
        </div>
      </div>
    </div>
  );
};
