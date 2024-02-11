"use client";

import { internalLinks } from "@/components/Utils/internalLinks";
import { MotionAddButtonLink } from "@/components/layout/Footer/MotionAddButtonLink";
import { LinkNav } from "@/components/layout/Header/LinkNav";
import { AdminPanelIcon } from "@/icons/AdminPanelIcon";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";

export const AdminNav = () => {
  const user = useStore($user);
  return (
    <nav className="mt-20">
      <MotionAddButtonLink delay={0.1}>
        <LinkNav
          link={{
            href: internalLinks("admin"),
            icon: <AdminPanelIcon />,
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
    </nav>
  );
};
