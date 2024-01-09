/* import { Link } from "@nextui-org/react"; */
import { compareRoutes } from "@/components/Utils/comparePaths";
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
  const { href, icon, text } = link;
  return (
    <Link
      className={`${
        component === "footer" && "w-[3rem]"
      } relative text-${size} text-${textColor} flex flex-${flexType} justify-center items-center hover:bg-secundario/20 rounded-t-lg p-1 duration-300 ease-in ${
        flexType === "row" ? "gap-4" : "gap-0"
      }`}
      href={href}
    >
      {compareRoutes(path, href) && (
        <motion.span
          layoutId={component}
          className="absolute left-0 top-full block h-[1px] w-full bg-terciario"
        />
      )}
      {icon}
      <p>{text}</p>
    </Link>
  );
};
