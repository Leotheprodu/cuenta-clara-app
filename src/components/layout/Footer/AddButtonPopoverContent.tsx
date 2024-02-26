import { PopoverContent } from "@nextui-org/react";
import { AddButtonLinkItem } from "./AddButtonLinkItem";
import { useLinksAddButton } from "./useLinksAddButton";
import { MotionAddButtonLink } from "./MotionAddButtonLink";

export const AddButtonPopoverContent = ({
  internalLinkName,
}: {
  internalLinkName: string;
}) => {
  const { links } = useLinksAddButton();
  return (
    <PopoverContent className="max-w-[18rem]">
      <div>
        {links.map(
          (link, index) =>
            link.pagesIncluded.includes(internalLinkName) && (
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
