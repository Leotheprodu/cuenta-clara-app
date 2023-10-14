"use client";
import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsernameNewClient } from "./InputUsernameNewClient";
import { InputEmailNewClient } from "./InputEmailNewClient";
import { InputCellphoneNewClient } from "./InputCellphoneNewClient";

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
            <InputUsernameNewClient handle={{ username, handleOnChange }} />
            <InputEmailNewClient handle={{ email, handleOnChange }} />
            <InputCellphoneNewClient handle={{ cellphone, handleOnChange }} />
            <Button color="primary" className=" uppercase w-full" type="submit">
                Crear
            </Button>
        </form>
    );
};
