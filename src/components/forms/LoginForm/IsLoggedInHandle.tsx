import { Button } from "@nextui-org/react";
import { useIsLoggedInHandle } from "./useIsLoggedInHandle";

export const IsLoggedInHandle = () => {
    const { handleLogout, router, isPending } = useIsLoggedInHandle();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1>Ya has iniciado sesion</h1>
            <div className="flex justify-center items-center gap-4">
                <Button
                    onClick={() => router.back()}
                    className="uppercase"
                    color="primary"
                >
                    Atras
                </Button>
                <Button
                    isLoading={isPending}
                    onClick={handleLogout}
                    className="uppercase"
                    color="danger"
                >
                    Cerrar Sesion
                </Button>
            </div>
        </div>
    );
};
