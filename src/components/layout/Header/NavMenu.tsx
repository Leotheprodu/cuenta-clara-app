import { MenuButtonIcon } from "@/icons/MenuButtonIcon";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { LinkNav } from "./LinkNav";
import { usePathname } from "next/navigation";
import { ClientsIcon } from "@/icons/ClientsIcon";
import { Button, Popover, PopoverTrigger } from "@nextui-org/react";
import { PopoverContent } from "@nextui-org/react";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { LoginIcon } from "@/icons/LoginIcon";
import { MotionAddButtonLink } from "../Footer/MotionAddButtonLink";
import { TransactionsIcon } from "@/icons/TransactionsIcon";
import { internalLinks } from "@/components/Utils/internalLinks";
import { useLinksHeader } from "./LinksHeader";

export const AddButtonPopoverContent = ({ handle }: any) => {
  const path = usePathname();
  const user = useStore($user);
  const { data } = useLinksHeader();

  return (
    <PopoverContent className="p-10">
      <nav className="flex flex-col items-start">
        {data.map((item: any, index: number) => (
          <MotionAddButtonLink key={index} delay={item.delay}>
            <LinkNav
              link={item.link}
              path={path}
              textColor="primario"
              flexType="row"
              size="lg"
              component="navMenu"
            />
          </MotionAddButtonLink>
        ))}
      </nav>
    </PopoverContent>
  );
};

export const NavMenuPopoverTrigger = ({ handle }: any) => {
  const { handlePopoverTriggerClick } = handle;
  return (
    <PopoverTrigger>
      <Button
        className="text-blanco flex items-center justify-center h-16 w-16 rounded-sm p-0"
        type="button"
        variant="light"
        onClick={handlePopoverTriggerClick}
      >
        <MenuButtonIcon className="" />
      </Button>
    </PopoverTrigger>
  );
};
export const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handlePopoverTriggerClick = () => {
    setIsOpen(!isOpen);
  };
  const handlePopoverOnClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Popover
        shouldCloseOnBlur
        onClose={handlePopoverOnClose}
        backdrop="opaque"
        isOpen={isOpen}
        onClick={handlePopoverOnClose}
      >
        <NavMenuPopoverTrigger handle={{ handlePopoverTriggerClick }} />
        <AddButtonPopoverContent handle={{ handlePopoverTriggerClick }} />
      </Popover>
    </>
  );
};
