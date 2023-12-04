import { whiteListPaths } from "@/data/constants";
import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
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
    path,
    balance,
    handleShowBalance,
    showBalance,
  } = handle;
  const maxWidth = window.innerWidth - 130; // 300 es el margen derecho que deseas
  const maxHeight = window.innerHeight - 300; // 500 es el margen inferior que deseas
  return (
    <>
      {!whiteListPaths.includes(path) && (
        <>
          <span className="w-[1px] mx-1 bg-terciario h-8 rounded-md"></span>
          <Select
            size="sm"
            variant="underlined"
            isDisabled={isLoadingBusiness || isPending}
            items={business}
            label="Selecciona tu negocio"
            className="max-w-[10rem] text-blanco"
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
          {!showBalance && (
            <Tooltip content="Ver saldo">
              <motion.button
                onClick={handleShowBalance}
                layoutId="balance"
                className="flex items-center justify-center h-8 w-8 rounded-md bg-primario/50"
              >
                <AddTransactionIcon className="text-cuaternario/50 h-6" />
              </motion.button>
            </Tooltip>
          )}
        </>
      )}
      {showBalance && (
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
    </>
  );
};
