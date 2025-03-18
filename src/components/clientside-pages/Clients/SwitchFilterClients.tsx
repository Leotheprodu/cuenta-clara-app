import { Checkbox } from "@nextui-org/react";

export const SwitchFilterClients = ({
  handle,
}: {
  handle: {
    isActive?: boolean;
    isShowActivoButton?: boolean;
    isShowDebtorsButton?: boolean;
    handleIsSelectedSwitch: (
      value: boolean,
      typeOfSwitch: "actives" | "debtors"
    ) => void;
    switchText?: {
      on: string;
      off: string;
    };
    typeOfSwitch: "actives" | "debtors";
  };
}) => {
  const {
    handleIsSelectedSwitch,
    isShowActivoButton,
    isShowDebtorsButton,
    switchText,
    typeOfSwitch = "actives",
    isActive = true,
  } = handle;
  const { on = "Activos", off = "Inactivos" } = switchText || {};

  return (
    <div className=" flex justify-end p-2 rounded-b-md  ">
      <Checkbox
        isDisabled={!isActive}
        isSelected={
          typeOfSwitch === "actives" ? isShowActivoButton : isShowDebtorsButton
        }
        onValueChange={(isSelected) => {
          handleIsSelectedSwitch(isSelected, typeOfSwitch);
        }}
        size="sm"
        color="primary"
      >
        {
          {
            actives: isShowActivoButton ? on : off,
            debtors: isShowDebtorsButton ? on : off,
          }[typeOfSwitch]
        }
      </Checkbox>
    </div>
  );
};
