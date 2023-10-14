import { KeyIcon } from "@/icons/KeyIcon";
import { Input } from "@nextui-org/react";
import { EndContentInputPassword } from "./EndContentInputPassword";
import { InputPasswordLoginFormProps } from "./InterfacesLoginForm";

export const InputPasswordLoginForm = ({
    handle,
}: InputPasswordLoginFormProps) => {
    const {
        handleOnChange,
        isVisible,
        toggleVisibility,
        isInvalidPass,
        password,
    } = handle;

    return (
        <div>
            <Input
                size="lg"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                endContent={
                    <EndContentInputPassword
                        isVisible={isVisible}
                        toggleVisibility={toggleVisibility}
                    />
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
                startContent={
                    <KeyIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                autoComplete="current-password"
                isInvalid={isInvalidPass}
                errorMessage={isInvalidPass && "Contraseña Incorrecta"}
                value={password}
                onChange={handleOnChange}
                name="password"
            />
        </div>
    );
};
