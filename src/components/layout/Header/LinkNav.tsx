/* import { Link } from "@nextui-org/react"; */
import { compareRoutes } from "@/components/Utils/comparePaths";
import { blockedPages } from "@/components/Utils/internalLinks";
import { $internalLinkName } from "@/stores/generalConfig";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import Link from "next/link";

export const LinkNav = ({
  link,
  path,
  textColor = "blanco",
  flexType = "col",
  size = "xs",
  component,
}: LinkNavProps) => {
  const { href, icon, text, exclude, isLoggedInRequired, page } = link;
  const internalLinkName = useStore($internalLinkName);
  const user = useStore($user);
  if (!blockedPages(exclude, internalLinkName)) {
    return null;
  }
  if (isLoggedInRequired && !user.isLoggedIn) {
    return null;
  }
  return (
    <Link
      className={`${
        component === "footer" && "w-[3rem]"
      } relative text-${size} text-${textColor} flex flex-${flexType} justify-center items-center hover:bg-secundario/5 rounded-lg p-1 duration-300 ease-in ${
        flexType === "row" ? "gap-4" : "gap-0"
      }`}
      href={href}
    >
      {page === internalLinkName && (
        <>
          <motion.span
            layoutId={component}
            className="absolute bottom-0 block h-[1px] w-full bg-gradient-to-l from-terciario to-secundario rounded-lg"
          />
        </>
      )}
      <div className={`${component !== "footer" && "text-terciario"}`}>
        {icon}
      </div>
      <p className={`${component !== "footer" && "text-primario"}`}>{text}</p>
    </Link>
  );
};
