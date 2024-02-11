"use client";

import { PageWrapper } from "@/components/Utils/PageWrapper";
import { AdminNav } from "@/components/clientside-pages/Admin/AdminNav";
import { ArrowBackIcon } from "@/icons/ArrowBackIcon";
import { MenuButtonIcon } from "@/icons/MenuButtonIcon";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useStore($user);
  const [isMovil, setIsMovil] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMovil(true);
      setShowMenu(false);
    } else {
      setIsMovil(false);
      setShowMenu(true);
    }
  }, []);
  if (user.employee.isAdmin) {
    return (
      <div className="my-16 flex w-full">
        {showMenu ? (
          <PageWrapper variant="2">
            <section
              className={`${
                isMovil
                  ? "w-full"
                  : "w-[17rem] border-r-1 border-r-slate-200 shadow-small"
              } bg-blanco flex flex-col items-center justify-start min-h-screen fixed`}
            >
              <PageWrapper variant="2">
                <AdminNav />
              </PageWrapper>

              <Button
                variant="light"
                className="absolute top-1 right-1 flex items-center text-secundario justify-center h-12 w-12 rounded-sm p-0"
                onClick={() => setShowMenu(!showMenu)}
              >
                {isMovil ? (
                  "x"
                ) : (
                  <ArrowBackIcon className="text-secundario w-6" />
                )}
              </Button>
            </section>
          </PageWrapper>
        ) : (
          <PageWrapper variant="2">
            <section className="fixed">
              <Button
                className="flex items-center justify-center h-12 w-12 rounded-sm p-0"
                variant="light"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MenuButtonIcon />
              </Button>
            </section>
          </PageWrapper>
        )}
        <div className={`w-full ${!isMovil && showMenu && "ml-[17rem]"}`}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-16 flex w-full items-center justify-center min-h-screen">
        Acceso Denegado
      </div>
    );
  }
}
