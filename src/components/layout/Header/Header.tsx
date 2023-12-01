"use client";
import Link from "next/link";
import { useHeader } from "./useHeader";
import { HeaderBusinessSelector } from "./HeaderBusinessSelector";
import { appName } from "@/data/constants";
import { NavMenu } from "./nav/NavMenu";

export const Header = () => {
  const {
    business,
    isLoadingBusiness,
    handleSelectionBusiness,
    value,
    isPending,
    mutateFunction,
    path,
    isLoggedIn,
  } = useHeader();

  return (
    <header className="h-16 flex w-full bg-primario fixed top-0 z-20">
      <div className="flex w-full h-full items-center px-6">
        <Link href="/">
          <h1 className="text-cuaternario font-sans uppercase">{appName}</h1>
        </Link>
        {isLoggedIn && (
          <HeaderBusinessSelector
            handle={{
              business,
              isLoadingBusiness,
              handleSelectionBusiness,
              value,
              isPending,
              mutateFunction,
              path,
            }}
          />
        )}
      </div>
      <NavMenu />
    </header>
  );
};
