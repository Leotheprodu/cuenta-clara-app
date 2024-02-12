"use client";

import { internalLinks } from "@/components/Utils/internalLinks";
import { MotionAddButtonLink } from "@/components/layout/Footer/MotionAddButtonLink";
import { LinkNav } from "@/components/layout/Header/LinkNav";
import { AdminPanelIcon } from "@/icons/AdminPanelIcon";
import { HomeIcon } from "@/icons/HomeIcon";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";

export const AdminNav = () => {
  const user = useStore($user);
  return (
    <nav className="mt-20 flex flex-col items-start gap-4">
      <MotionAddButtonLink delay={0.3}>
        <LinkNav
          link={{
            href: internalLinks("admin"),
            icon: <AdminPanelIcon className="w-6" />,
            text: "Administrar",
            exclude: [],
            isLoggedInRequired: true,
            page: "admin",
          }}
          textColor="secundario"
          flexType="row"
          size="lg"
          component="adminMenu"
        />
      </MotionAddButtonLink>
      <MotionAddButtonLink delay={0.4}>
        <LinkNav
          link={{
            href: internalLinks("businesses"),
            icon: <HomeIcon />,
            text: "Tus Negocios",
            exclude: [],
            isLoggedInRequired: true,
            page: "businesses",
          }}
          textColor="secundario"
          flexType="row"
          size="lg"
          component="adminMenu"
        />
      </MotionAddButtonLink>
    </nav>
  );
};
