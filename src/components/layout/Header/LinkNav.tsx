/* import { Link } from "@nextui-org/react"; */
import { compareRoutes } from "@/components/Utils/comparePaths";
import { blockedPages } from "@/components/Utils/internalLinks";
import { $GlobalLoading, $internalLinkName } from "@/stores/generalConfig";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const LinkNav = ({
  link,
  textColor = "blanco",
  flexType = "col",
  size = "xs",
  component,
}: LinkNavProps) => {
  const { href, icon, text, exclude, isLoggedInRequired, page } = link;
  const internalLinkName = useStore($internalLinkName);
  const [showSpinner, setShowSpinner] = useState(false);
  const user = useStore($user);
  const handlePageLoading = () => {
    if (page === internalLinkName) {
      return;
    }
    $GlobalLoading.set({ isLoading: true, message: `cargando contenido` });
    setShowSpinner(true);
  };
  useEffect(() => {
    if (page === internalLinkName) {
      setShowSpinner(false);
    }
  }, [page, internalLinkName]);
  if (!blockedPages(exclude, internalLinkName)) {
    return null;
  }
  if (isLoggedInRequired && !user.isLoggedIn) {
    return null;
  }
  return (
    <Link
      className={`${
        flexType === "col" && "w-[3rem]"
      } relative text-${size} text-${textColor} flex flex-${flexType} justify-center items-center ${
        flexType === "col" ? "hover:bg-secundario/50" : "hover:bg-slate-100"
      } ${
        page === internalLinkName && component !== "footer" && "bg-slate-50"
      } rounded-lg p-1 duration-300 ease-in ${
        flexType === "row" ? "gap-4" : "gap-0"
      }`}
      href={href}
      onClick={handlePageLoading}
    >
      {page === internalLinkName && (
        <>
          <motion.span
            layoutId={component}
            className={`absolute block bg-slate-200 rounded-lg ${
              flexType === "col"
                ? "bottom-0 h-[1px] w-full"
                : "left-0 w-[1px] h-full"
            }`}
          />
        </>
      )}

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        className={`${component !== "footer" && "text-terciario"}`}
      >
        {showSpinner ? <Spinner /> : icon}
      </motion.div>
      <p className={`${component !== "footer" && "text-primario"}`}>{text}</p>
    </Link>
  );
};
