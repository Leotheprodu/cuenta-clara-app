import { Button } from "@nextui-org/react";
import { useNewClient } from "./useNewClient";
import { InputUsername } from "./InputUsername";
import { InputEmail } from "./InputEmail";
import { InputCellphone } from "./InputCellphone";
import { BusinessList } from "./BusinessList";
import { SelectCountry } from "./SelectCountry";
import { InputDetail } from "./InputDetail";
import { useRouter } from "next/navigation";

export const NewClient = () => {
    const router = useRouter();

    const {
        handleCreateClient,
        handleOnChange,
        username,
        detail,
        email,
        cellphone,
        isPending,
        isLoadingBusiness,
        business,
        selectedKeys,
        countryCodes,
        countrySelected,
        codeSelected,
        handleSelectionChange,
        handleCountrySelectionChange,
    } = useNewClient({
        username: "",
        email: "",
        cellphone: "",
        token: "",
        id_business: [],
        country: "",
        detail: "",
    });
    return (
        <form
            onSubmit={handleCreateClient}
            className="flex flex-col items-center justify-center gap-4 p-3"
        >
            <BusinessList
                title="Crea un nuevo cliente"
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
            <InputCellphone
                handle={{ cellphone, handleOnChange, codeSelected }}
            />
            <InputEmail handle={{ email, handleOnChange }} />

            <InputDetail handle={{ detail, handleOnChange }} />
            <div className="flex gap-2 mt-3">
                <Button
                    onClick={() => router.back()}
                    type="button"
                    color="danger"
                    className=" uppercase w-full"
                >
                    Cancelar
                </Button>
                <Button
                    isLoading={isPending}
                    color="primary"
                    className=" uppercase w-full "
                    type="submit"
                >
                    Crear
                </Button>
            </div>
        </form>
    );
};
