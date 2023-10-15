import { PopoverContent } from "@nextui-org/react";
import { LinksAddButon } from "./LinksAddButon";
import { AddButtonLinkItem } from "./AddButtonLinkItem";

export const AddButtonPopoverContent = () => {
    return (
        <PopoverContent>
            <div>
                {LinksAddButon.map((link, index) => (
                    <AddButtonLinkItem key={index} link={link} />
                ))}
            </div>
        </PopoverContent>
    );
};
