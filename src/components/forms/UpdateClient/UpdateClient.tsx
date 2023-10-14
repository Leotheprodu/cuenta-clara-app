"use client";
import { Button } from "@nextui-org/react";
import { useUpdateClient } from "./useUpdateClient";
import { InputUsername } from "../NewClient/InputUsername";
import { InputEmail } from "../NewClient/InputEmail";
import { InputCellphone } from "../NewClient/InputCellphone";
import { InputChangeToken } from "./InputChangeToken";

export const UpdateClient = ({ id }: { id: string }) => {
    const {
        handleUpdateClient,
        handleOnChange,
        handleNewToken,
        username,
        email,
        cellphone,
        token,
    } = useUpdateClient(
        {
            id: id,
            username: "",
            email: "",
            cellphone: "",
            token: "",
        },
        id
    );

    return (
        <form
            onSubmit={handleUpdateClient}
            className="flex flex-col items-center justify-center gap-4"
        >
            <InputUsername handle={{ username, handleOnChange }} />

            <InputEmail handle={{ email, handleOnChange }} />

            <InputCellphone handle={{ cellphone, handleOnChange }} />

            <InputChangeToken
                handle={{ token, handleOnChange, handleNewToken }}
            />

            <Button color="primary" className="uppercase w-full" type="submit">
                Actualizar
            </Button>
        </form>
    );
};
