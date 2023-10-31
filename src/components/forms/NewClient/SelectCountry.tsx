import { Select, SelectItem } from "@nextui-org/react";

export const SelectCountry = ({ handle }: SelectCountryProps) => {
    const { handleCountrySelectionChange, countrySelected, countryCodes } =
        handle;
    return (
        <Select
            isRequired
            label="País"
            placeholder="Selecciona el país del cliente"
            defaultSelectedKeys={["Costa Rica"]}
            className=""
            variant="underlined"
            onSelectionChange={handleCountrySelectionChange}
            selectedKeys={countrySelected}
        >
            {countryCodes.map((item: any) => (
                <SelectItem key={item.country} value={item.code}>
                    {item.country}
                </SelectItem>
            ))}
        </Select>
    );
};
