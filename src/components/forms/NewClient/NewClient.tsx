"use client";
import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsername } from "./InputUsername";
import { InputEmail } from "./InputEmail";
import { InputCellphone } from "./InputCellphone";
import { BusinessList } from "./BusinessList";

import { Select, SelectItem } from "@nextui-org/react";
export const NewClient = () => {
    const {
        handleCreateClient,
        handleOnChange,
        username,
        email,
        cellphone,
        isPending,
        isLoadingBusiness,
        business,
        selectedKeys,
        countryCodes,
        countrySelected,
        codeSelected,
        handleSelectionChange,
        handleCountrySelectionChange,
    } = useNewClient({
        username: "",
        email: "",
        cellphone: "",
        token: "",
        id_business: [],
    });

    return (
        <form
            onSubmit={handleCreateClient}
            className="flex flex-col items-center justify-center gap-4 p-3"
        >
            <BusinessList
                title="Crea un nuevo cliente"
                handle={{
                    isLoadingBusiness,
                    business,
                    selectedKeys,
                    handleSelectionChange,
                }}
            />
            <Select
                isRequired
                label="País"
                placeholder="Slecciona el país del cliente"
                defaultSelectedKeys={["Costa Rica"]}
                className=""
                variant="underlined"
                onSelectionChange={handleCountrySelectionChange}
                selectedKeys={countrySelected}
            >
                {countryCodes.map((item) => (
                    <SelectItem key={item.country} value={item.code}>
                        {item.country}
                    </SelectItem>
                ))}
            </Select>
            <InputUsername handle={{ username, handleOnChange }} />
            <InputCellphone
                handle={{ cellphone, handleOnChange, codeSelected }}
            />
            <InputEmail handle={{ email, handleOnChange }} />
            <Button
                isLoading={isPending}
                color="primary"
                className=" uppercase w-full mt-3"
                type="submit"
            >
                Crear
            </Button>
        </form>
    );
};
