"use client";
import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsername } from "./InputUsername";
import { InputEmail } from "./InputEmail";
import { InputCellphone } from "./InputCellphone";

export const NewClient = () => {
    const {
        handleCreateClient,
        handleOnChange,
        username,
        email,
        cellphone,
        isPending,
    } = useNewClient({
        username: "",
        email: "",
        cellphone: "",
        token: "",
        id_business: 0,
    });

    return (
        <form
            onSubmit={handleCreateClient}
            className="flex flex-col items-center justify-center gap-4"
        >
            <InputUsername handle={{ username, handleOnChange }} />
            <InputEmail handle={{ email, handleOnChange }} />
            <InputCellphone handle={{ cellphone, handleOnChange }} />
            <Button
                isLoading={isPending}
                color="primary"
                className=" uppercase w-full"
                type="submit"
            >
                Crear
            </Button>
        </form>
    );
};
