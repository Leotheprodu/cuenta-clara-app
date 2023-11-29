import { Link } from "@nextui-org/react";
import { motion } from "framer-motion";

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
      isBlock
      className={`relative text-${size} text-${textColor} flex flex-${flexType} justify-center items-center ${
        flexType === "row" ? "gap-4" : "gap-0"
      }`}
      href={href}
    >
      {path === href && (
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
