import { SwitchActivo } from "./SwitchActivo";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/icons/SearchIcon";

export const HeaderClients = ({ handle }: HeaderClientsProps) => {
  const {
    isShowActivoButton,
    HanldeIsSelected,
    handleSearchClient,
    searchClient,
  } = handle;
  return (
    <div className="z-10 flex fixed left-0 items-center justify-center w-full bg-blanco/80 shadow-md backdrop-blur-sm">
      <SwitchActivo handle={{ isShowActivoButton, HanldeIsSelected }} />
      <Input
        onChange={handleSearchClient}
        value={searchClient}
        type="text"
        size="sm"
        placeholder="Buscar cliente"
        className="sm:w-1/4 shadow-sm"
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      ></Input>
    </div>
  );
};
