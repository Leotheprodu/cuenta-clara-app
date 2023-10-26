"use client";

import { Popover } from "@nextui-org/react";
import { AddButtonPopoverContent } from "./AddButtonPopoverContent";
import { AddButtonPopoverTrigger } from "./AddButtonPopoverTrigger";
import { useAddButton } from "./useAddButton";

export const AddButton = () => {
    const { isOpen, handlePopoverOnClose, handlePopoverTriggerClick } =
        useAddButton();

    return (
        <div className="absolute top-[-1rem] transform-translate-y-1/2">
            <Popover
                shouldCloseOnBlur
                onClose={handlePopoverOnClose}
                backdrop="blur"
                isOpen={isOpen}
            >
                <AddButtonPopoverTrigger
                    handle={{ handlePopoverTriggerClick }}
                />
                <AddButtonPopoverContent />
            </Popover>
        </div>
    );
};
