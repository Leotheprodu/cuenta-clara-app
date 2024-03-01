import { ExpandIcon } from "@/icons/ExpandIcon";
import { PopoverTrigger, Button } from "@nextui-org/react";

export const AddButtonPopoverTrigger = ({
  handle,
}: AddButtonPopoverTriggerProps) => {
  const { handlePopoverTriggerClick, isOpen } = handle;
  return (
    <PopoverTrigger>
      <Button
        isIconOnly
        aria-label="agregar"
        radius="full"
        className="hover:scale-105 h-16 w-16 p-0 m-0 bg-secundario shadow-xl text-blanco flex justify-center items-center"
        onClick={handlePopoverTriggerClick}
      >
        <ExpandIcon
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-150`}
        />
      </Button>
    </PopoverTrigger>
  );
};
