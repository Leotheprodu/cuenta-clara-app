"use client";

import { Popover } from "@nextui-org/react";
import { AddButtonPopoverContent } from "./AddButtonPopoverContent";
import { AddButtonPopoverTrigger } from "./AddButtonPopoverTrigger";
import { useAddButton } from "./useAddButton";
import { useStore } from "@nanostores/react";
import { $AppState, $internalLinkName } from "@/stores/generalConfig";

export const AddButton = () => {
  const { isOpen, handlePopoverOnClose, handlePopoverTriggerClick } =
    useAddButton();
  const appState = useStore($AppState);
  const internalLinkName = useStore($internalLinkName);
  return (
    <div className="absolute top-[-1rem] transform-translate-y-1/2">
      <Popover
        onClose={handlePopoverOnClose}
        backdrop="opaque"
        isOpen={isOpen}
        className="z-10"
      >
        <AddButtonPopoverTrigger handle={{ handlePopoverTriggerClick }} />
        <AddButtonPopoverContent internalLinkName={internalLinkName} />
      </Popover>
    </div>
  );
};
