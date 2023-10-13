import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { KeyIcon } from "@/icons/KeyIcon";
import { Input } from "@nextui-org/react";

interface InputEmailProps {
    handle: {
        isVisible: boolean;
        isInvalidPass: boolean;
        toggleVisibility: () => void;
        password: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
export const InputPassword = ({ handle }: InputEmailProps) => {
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
                    <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
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
