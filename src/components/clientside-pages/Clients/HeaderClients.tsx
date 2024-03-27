import { SwitchFilterActive } from "./SwitchFilterActive";
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
    <div className="z-10 flex fixed left-0 items-center justify-center w-full bg-neutral-50 shadow-sm">
      <SwitchFilterActive handle={{ isShowActivoButton, HanldeIsSelected }} />
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
