import { MenuButtonIcon } from "@/icons/MenuButtonIcon";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { LinkNav } from "./LinkNav";
import { ClientsIcon } from "@/icons/ClientsIcon";
import { Button, Popover, PopoverTrigger } from "@nextui-org/react";
import { PopoverContent } from "@nextui-org/react";
import { MotionAddButtonLink } from "../Footer/MotionAddButtonLink";
import { blockedPages, internalLinks } from "@/components/Utils/internalLinks";
import { useLinksHeader } from "./LinksHeader";
import { $internalLinkName } from "@/stores/generalConfig";

export const AddButtonPopoverContent = ({ handle }: any) => {
  const user = useStore($user);
  const { data } = useLinksHeader();
  const internalLinkName = useStore($internalLinkName);
  return (
    <PopoverContent className="p-10">
      <nav className="flex flex-col items-start gap-1">
        {data.map((item: LinksHeaderDataProps, index: number) => (
          <MotionAddButtonLink
            disabled={!blockedPages(item.link.exclude, internalLinkName)}
            key={index}
            delay={item.delay}
          >
            <div className="flex items-center">
              <LinkNav
                link={item.link}
                textColor="primario"
                flexType="row"
                size="lg"
                component="navMenu"
              />
            </div>
          </MotionAddButtonLink>
        ))}
        {!user.isLoggedIn && (
          <MotionAddButtonLink delay={0.2}>
            <LinkNav
              link={{
                href: internalLinks("sign-up"),
                icon: <ClientsIcon />,
                text: "Registrarse",
                exclude: [],
                isLoggedInRequired: false,
                page: "sign-up",
              }}
              textColor="primario"
              flexType="row"
              size="lg"
              component="navMenu"
            />
          </MotionAddButtonLink>
        )}
      </nav>
    </PopoverContent>
  );
};

export const NavMenuPopoverTrigger = ({ handle }: any) => {
  const { handlePopoverTriggerClick } = handle;
  return (
    <PopoverTrigger>
      <Button
        className="text-blanco flex items-center justify-center h-16 w-16 rounded-sm p-0 mr-2"
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
