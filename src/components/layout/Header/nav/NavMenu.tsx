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
import { MotionAddButtonLink } from "../../Footer/MotionAddButtonLink";

export const AddButtonPopoverContent = () => {
  const path = usePathname();
  const user = useStore($user);
  return (
    <PopoverContent className="p-10">
      <nav className="flex flex-col items-start">
        <MotionAddButtonLink delay={0.1}>
          <LinkNav
            link={{
              href: "/sesion",
              icon: user.isLoggedIn === true ? <LogoutIcon /> : <LoginIcon />,
              text:
                user.isLoggedIn === true ? "Cerrar sesion" : "Iniciar sesion",
            }}
            path={path}
            textColor="primario"
            flexType="row"
            size="lg"
            component="navMenu"
          />
        </MotionAddButtonLink>
        <MotionAddButtonLink delay={0.2}>
          <LinkNav
            link={{
              href: "/clientes",
              icon: <ClientsIcon />,
              text: "Clientes",
            }}
            path={path}
            textColor="primario"
            flexType="row"
            size="lg"
            component="navMenu"
          />
        </MotionAddButtonLink>
      </nav>
    </PopoverContent>
  );
};

export const NavMenuPopoverTrigger = ({ handle }: any) => {
  const { handlePopoverTriggerClick } = handle;
  return (
    <PopoverTrigger>
      <Button
        className="text-blanco flex items-center justify-center h-16 w-16 rounded-full"
        type="button"
        variant="light"
        onClick={handlePopoverTriggerClick}
      >
        <MenuButtonIcon />
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
        showArrow
      >
        <NavMenuPopoverTrigger handle={{ handlePopoverTriggerClick }} />
        <AddButtonPopoverContent />
      </Popover>
    </>
  );
};
