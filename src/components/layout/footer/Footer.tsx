"use client";
import { AddButton } from "./AddButton";
import { usePathname } from "next/navigation";
import { LinksFooter } from "./LinksFooter";
import { LinksItemFooter } from "./LinksItemFooter";
import { whiteListPaths } from "@/data/constants";

export const Footer = () => {
  const path = usePathname();
  return (
    <>
      {!whiteListPaths.includes(path) && (
        <footer className="fixed z-20 bottom-0 h-16 w-full bg-primario ">
          <div className="flex gap-28 justify-center items-center w-full h-full  ">
            <AddButton />
            {LinksFooter.map((link, index) => (
              <LinksItemFooter key={index} link={link} path={path} />
            ))}
          </div>
        </footer>
      )}
    </>
  );
};
