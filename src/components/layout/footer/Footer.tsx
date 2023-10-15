"use client";
import { AddButton } from "./AddButton";
import { usePathname } from "next/navigation";
import { LinksFooter } from "./LinksFooter";
import { LinkItemFooter } from "./LinkItemFooter";

export const Footer = () => {
    const path = usePathname();
    return (
        <>
            {path !== "/sesion-de-usuario" && (
                <footer className="fixed z-10 bottom-0 h-16 w-full bg-primario ">
                    <div className="flex gap-28 justify-center items-center w-full h-full  ">
                        <AddButton />
                        {LinksFooter.map((link) => (
                            <LinkItemFooter
                                key={link.href}
                                link={link}
                                path={path}
                            />
                        ))}
                    </div>
                </footer>
            )}
        </>
    );
};
