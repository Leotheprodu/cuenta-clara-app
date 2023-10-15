import { AddIcon } from "@/icons/AddIcon";
import { PopoverTrigger, Button } from "@nextui-org/react";

export const AddButtonPopoverTrigger = ({
    handle,
}: AddButtonPopoverTriggerProps) => {
    const { handlePopoverTriggerClick } = handle;
    return (
        <PopoverTrigger>
            <Button
                isIconOnly
                aria-label="agregar"
                radius="full"
                className="h-16 w-16 p-0 m-0 bg-secundario shadow-xl text-blanco flex justify-center items-center"
                onClick={handlePopoverTriggerClick}
            >
                <AddIcon />
            </Button>
        </PopoverTrigger>
    );
};
