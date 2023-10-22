"use client";
import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsername } from "./InputUsername";
import { InputEmail } from "./InputEmail";
import { InputCellphone } from "./InputCellphone";
import { BusinessList } from "./BusinessList";

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
        handleSelectionChange,
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
                handle={{
                    isLoadingBusiness,
                    business,
                    selectedKeys,
                    handleSelectionChange,
                }}
            />
            <InputUsername handle={{ username, handleOnChange }} />
            <InputCellphone handle={{ cellphone, handleOnChange }} />
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
