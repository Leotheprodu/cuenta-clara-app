"use client";
import { AddButton } from "./AddButton";
import { usePathname } from "next/navigation";
import { LinksFooter } from "./LinksFooter";
import { LinksItemFooter } from "./LinksItemFooter";

export const Footer = () => {
    const path = usePathname();
    return (
        <>
            {path !== "/sesion-de-usuario" && (
                <footer className="fixed z-10 bottom-0 h-16 w-full bg-primario ">
                    <div className="flex gap-28 justify-center items-center w-full h-full  ">
                        <AddButton />
                        {LinksFooter.map((link, index) => (
                            <LinksItemFooter
                                key={index}
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
