import { Listbox, ListboxItem } from "@nextui-org/react";
import Loading from "@/app/loading";
export const BusinessList = ({ handle }: BusinessListProps) => {
    const { isLoadingBusiness, business, selectedKeys, handleSelectionChange } =
        handle;
    if (isLoadingBusiness) {
        return <Loading />;
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                <h1 className="w-full text-center mb-2">
                    Agrega un nuevo cliente
                </h1>
                <h2 className="p-2 text-sm">Negocios:</h2>
                <p className="font-light text-xs p-2 w-[260px]">
                    Seleccione a cuales de tus negocios quieres asignar tu nuevo
                    cliente:
                </p>
                <Listbox
                    aria-label="Seleccione el negocio"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}
                >
                    {business.map((item) => (
                        <ListboxItem textValue="Negocio" key={item.id}>
                            {item.name}
                        </ListboxItem>
                    ))}
                </Listbox>
            </div>
        </div>
    );
};
