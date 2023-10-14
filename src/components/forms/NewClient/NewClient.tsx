"use client";
import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsername } from "./InputUsername";
import { InputEmail } from "./InputEmail";
import { InputCellphone } from "./InputCellphone";

export const NewClient = () => {
    const { handleCreateClient, handleOnChange, username, email, cellphone } =
        useNewClient({
            username: "",
            email: "",
            cellphone: "",
            token: "",
        });

    return (
        <form
            onSubmit={handleCreateClient}
            className="flex flex-col items-center justify-center gap-4"
        >
            <InputUsername handle={{ username, handleOnChange }} />
            <InputEmail handle={{ email, handleOnChange }} />
            <InputCellphone handle={{ cellphone, handleOnChange }} />
            <Button color="primary" className=" uppercase w-full" type="submit">
                Crear
            </Button>
        </form>
    );
};
