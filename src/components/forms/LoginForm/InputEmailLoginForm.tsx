import { MailIcon } from "@/icons/MailIcon";
import { Input } from "@nextui-org/react";
import { InputEmailLoginFormProps } from "./InterfacesLoginForm";

export const InputEmailLoginForm = ({ handle }: InputEmailLoginFormProps) => {
    const { handleOnClear, email, handleOnChange } = handle;
    return (
        <div>
            <Input
                size="lg"
                type="email"
                isClearable
                onClear={() => handleOnClear("email")}
                label="Correo Electronico"
                placeholder="Ingresa tu correo electronico"
                startContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                autoComplete="username"
                value={email}
                onChange={handleOnChange}
                name="email"
            />
        </div>
    );
};