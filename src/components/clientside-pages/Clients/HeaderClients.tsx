import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/icons/SearchIcon";
import { SwitchFilterClients } from "./SwitchFilterClients";

export const HeaderClients = ({ handle }: HeaderClientsProps) => {
  const {
    isShowActivoButton,
    isShowDebtorsButton,
    handleIsSelectedSwitch,
    handleSearchClient,
    searchClient,
  } = handle;
  return (
    <div className="z-10 flex fixed left-0 items-center justify-center w-full bg-neutral-50 shadow-sm">
      <SwitchFilterClients
        handle={{
          isShowActivoButton,
          handleIsSelectedSwitch,
          typeOfSwitch: "actives",
          switchText: { on: "Usuarios activos", off: "Usuarios activos" },
          isActive: !isShowDebtorsButton,
        }}
      />
      <SwitchFilterClients
        handle={{
          isShowDebtorsButton,
          handleIsSelectedSwitch,
          typeOfSwitch: "debtors",
          switchText: { on: "Filtrar deudores", off: "Filtrar deudores" },
          isActive: isShowActivoButton,
        }}
      />
      <Input
        onChange={handleSearchClient}
        value={searchClient}
        type="text"
        size="sm"
        placeholder="Buscar cliente"
        className="w-[20rem]"
        classNames={{ inputWrapper: "h-[2rem]" }}
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      ></Input>
    </div>
  );
};
