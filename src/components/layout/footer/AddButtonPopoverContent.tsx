import { PopoverContent } from "@nextui-org/react";
import { AddButtonLinkItem } from "./AddButtonLinkItem";
import { comparePaths } from "@/components/Utils/comparePaths";
import { PropsAppState } from "@/stores/generalConfig";
import { useLinksAddButton } from "./useLinksAddButton";
import { useEffect } from "react";

export const AddButtonPopoverContent = ({
  appState,
}: {
  appState: PropsAppState;
}) => {
  const { links } = useLinksAddButton();
  return (
    <PopoverContent className="z-10">
      <div>
        {links.map(
          (link, index) =>
            link.pagesIncluded.includes(appState.page) && (
              <AddButtonLinkItem key={index} link={link} />
            )
        )}
      </div>
    </PopoverContent>
  );
};
