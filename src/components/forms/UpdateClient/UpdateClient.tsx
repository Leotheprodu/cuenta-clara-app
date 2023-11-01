"use client";
import { Button } from "@nextui-org/react";
import { useUpdateClient } from "./useUpdateClient";
import { InputUsername } from "../NewClient/InputUsername";
import { InputEmail } from "../NewClient/InputEmail";
import { InputCellphone } from "../NewClient/InputCellphone";
import { InputChangeToken } from "./InputChangeToken";
import { BusinessList } from "../NewClient/BusinessList";
import { SelectCountry } from "../NewClient/SelectCountry";
import { InputDetail } from "../NewClient/InputDetail";

export const UpdateClient = ({ id }: { id: string }) => {
    const {
        handleUpdateClient,
        handleOnChange,
        handleNewToken,
        username,
        detail,
        email,
        cellphone,
        token,
        isPending,
        isLoadingBusiness,
        business,
        selectedKeys,
        codeSelected,
        handleSelectionChange,
        handleCountrySelectionChange,
        countryCodes,
        countrySelected,
    } = useUpdateClient(
        {
            id: parseInt(id, 10),
            username: "",
            email: "",
            cellphone: "",
            token: "",
            detail: "",
            id_business: [],
        },
        id
    );

    return (
        <form
            onSubmit={handleUpdateClient}
            className="flex flex-col items-center justify-center gap-4"
        >
            <BusinessList
                title="Actualiza tu cliente"
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

            <InputEmail handle={{ email, handleOnChange }} />

            <InputCellphone
                handle={{ cellphone, handleOnChange, codeSelected }}
            />
            <InputDetail handle={{ detail, handleOnChange }} />

            <InputChangeToken
                handle={{ token, handleOnChange, handleNewToken }}
            />

            <Button
                isLoading={isPending}
                color="primary"
                className="uppercase w-full"
                type="submit"
            >
                Actualizar
            </Button>
        </form>
    );
};
