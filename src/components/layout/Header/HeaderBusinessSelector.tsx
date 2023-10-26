import { whiteListPaths } from "@/data/constants";
import { Select, SelectItem } from "@nextui-org/react";

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
    } = handle;
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
                </>
            )}
        </>
    );
};
