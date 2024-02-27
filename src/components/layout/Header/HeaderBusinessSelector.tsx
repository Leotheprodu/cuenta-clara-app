"use client";
import { isUserRequired } from "@/components/Utils/internalLinks";
import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import { $internalLinkName } from "@/stores/generalConfig";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";
import { Select, SelectItem, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
export const HeaderBusinessSelector = ({
  handle,
}: HeaderBusinessSelectorProps) => {
  const {
    business,
    isLoadingBusiness,
    handleSelectionBusiness,
    value,
    isPending,
    mutateFunction,
    balance,
    handleShowBalance,
    showBalance,
  } = handle;
  const internalLinkName = useStore($internalLinkName);
  const user = useStore($user);
  const maxWidth = typeof window !== "undefined" ? window.innerWidth - 130 : 0; // 300 es el margen derecho que deseas
  const maxHeight =
    typeof window !== "undefined" ? window.innerHeight - 300 : 0; // 500 es el margen inferior que deseas

  return (
    <div className="flex gap-1 items-center">
      <div className="flex gap-1 items-center">
        <span className="w-[1px] mx-1 bg-terciario h-8 rounded-md"></span>
        <Select
          size="sm"
          variant="flat"
          color="primary"
          isLoading={isLoadingBusiness || isPending}
          isDisabled={!isUserRequired(internalLinkName)}
          items={business}
          label="Selecciona tu negocio"
          className="min-w-[13rem]"
          selectedKeys={value}
          onSelectionChange={handleSelectionBusiness}
          onChange={mutateFunction}
        >
          {(business) => (
            <SelectItem key={business.id} value={business.id}>
              {business.name}
            </SelectItem>
          )}
        </Select>
        {!showBalance && user.isLoggedIn && (
          <motion.button
            onClick={handleShowBalance}
            layoutId="balance"
            className="flex items-center justify-center h-8 rounded-md bg-primario/50"
          >
            <AddTransactionIcon className="text-cuaternario/50 h-6" />
            <span className="text-sm text-slate-400 hidden sm:block">
              Saldo
            </span>
          </motion.button>
        )}
      </div>

      {showBalance && user.isLoggedIn && (
        <motion.div
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: maxWidth,
            bottom: maxHeight,
          }}
          className="fixed left-2 top-[8rem] z-40 bg-gris p-4 shadow-sm rounded-md"
          layoutId="balance"
        >
          <button
            onClick={handleShowBalance}
            className="absolute top-[-.3rem] right-1 text-sm text-primario/50"
          >
            x
          </button>
          <div className="flex flex-col items-center">
            <h4 className="text-sm text-secundario/50">Saldo</h4>
            <small className="text-sm text-primario">{balance}</small>
          </div>
        </motion.div>
      )}
    </div>
  );
};
