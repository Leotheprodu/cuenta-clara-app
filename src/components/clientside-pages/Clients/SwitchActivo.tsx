import { Switch, cn } from "@nextui-org/react";

export const SwitchActivo = ({
  handle,
}: {
  handle: {
    isShowActivoButton: boolean;
    HanldeIsSelected: (value: boolean) => void;
  };
}) => {
  const { HanldeIsSelected, isShowActivoButton } = handle;
  return (
    <div className=" flex justify-end p-2 rounded-b-md  ">
      <Switch
        className=" "
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-30 max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-2 border-none",
            "data-[selected=true]:border-none "
          ),
          wrapper: cn(
            "p-0 h-3 overflow-visible",
            // selected
            "bg-secundario/60 outline-none",
            // pressed
            "group-data-[pressed=true]:w-8 border-none outline-none focus:outline-none",
            "group-data-[selected]:bg-secundario outline-none focus:outline-none"
          ),
          thumb: cn(
            "w-6 h-6 shadow-lg bg-primario border-none z-0",

            //selected
            "border-none bg-secundario",
            // pressed
            "group-data-[pressed=true]:w-8 border-none ",
            "group-data-[selected]:group-data-[pressed]: border-none"
          ),
        }}
        isSelected={isShowActivoButton}
        onValueChange={HanldeIsSelected}
        size="sm"
        color="primary"
      >
        {isShowActivoButton ? "Activos" : "Inactivos"}
      </Switch>
    </div>
  );
};
