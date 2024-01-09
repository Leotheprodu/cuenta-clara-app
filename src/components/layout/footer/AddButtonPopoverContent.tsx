import { PopoverContent } from "@nextui-org/react";
import { AddButtonLinkItem } from "./AddButtonLinkItem";
import { comparePaths } from "@/components/Utils/comparePaths";
import { PropsAppState } from "@/stores/generalConfig";
import { useLinksAddButton } from "./useLinksAddButton";
import { useEffect } from "react";
import { MotionAddButtonLink } from "./MotionAddButtonLink";

export const AddButtonPopoverContent = ({
  appState,
}: {
  appState: PropsAppState;
}) => {
  const { links } = useLinksAddButton();
  return (
    <PopoverContent className="max-w-[18rem]">
      <div>
        {links.map(
          (link, index) =>
            link.pagesIncluded.includes(appState.page) && (
              <AddButtonLinkItem key={index} link={link} />
            )
        )}
        <MotionAddButtonLink delay={0.4}>
          <div className="w-full border-t-1 border-t-slate-200">
            <p className="text-xs text-center text-slate-500">
              Estas opciones se muestran en base a la página en la que te
              encuentras
            </p>
          </div>
        </MotionAddButtonLink>
      </div>
    </PopoverContent>
  );
};
