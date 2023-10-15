import Link from "next/link";
import { motion } from "framer-motion";

export const LinkItemFooter = ({ link, path }: LinkItemFooterProps) => {
    const { href, icon, text } = link;
    return (
        <Link
            className="relative text-xs text-blanco flex flex-col justify-center items-center"
            href={href}
        >
            {path === href && (
                <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[1px] w-full bg-terciario"
                />
            )}
            {icon}
            <p>{text}</p>
        </Link>
    );
};
