"use client";
import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsername } from "./InputUsername";
import { InputEmail } from "./InputEmail";
import { InputCellphone } from "./InputCellphone";
import { BusinessList } from "./BusinessList";
import { SelectCountry } from "./SelectCountry";

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
        country: "",
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
            <SelectCountry
                handle={{
                    countryCodes,
                    countrySelected,
                    handleCountrySelectionChange,
                }}
            />
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
