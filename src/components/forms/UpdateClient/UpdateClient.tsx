"use client";
import { Button } from "@nextui-org/react";
import { useUpdateClient } from "./useUpdateClient";
import { InputUsername } from "../NewClient/InputUsername";
import { InputEmail } from "../NewClient/InputEmail";
import { InputCellphone } from "../NewClient/InputCellphone";
import { InputChangeToken } from "./InputChangeToken";
import { BusinessList } from "../NewClient/BusinessList";
import { SelectCountry } from "../NewClient/SelectCountry";
import { InputDetail } from "../NewClient/InputDetail";
import { useRouter } from "next/navigation";
import { InputAddress } from "../NewClient/InputAddress";

export const UpdateClient = ({ id }: { id: string }) => {
  const router = useRouter();

  const {
    handleUpdateClient,
    handleOnChange,
    handleNewToken,
    username,
    detail,
    address,
    email,
    cellphone,
    token,
    isPending,
    isLoadingBusiness,
    business,
    selectedKeys,
    codeSelected,
    handleSelectionChange,
    handleCountrySelectionChange,
    countryCodes,
    countrySelected,
    disabledKeys,
  } = useUpdateClient(
    {
      id: parseInt(id, 10),
      username: "",
      email: "",
      cellphone: "",
      address: "",
      token: "",
      detail: "",
      id_business: [],
    },
    id
  );

  return (
    <form
      onSubmit={handleUpdateClient}
      className="flex flex-col items-center justify-center gap-4 mb-6"
    >
      <BusinessList
        title="Actualiza tu cliente"
        handle={{
          isLoadingBusiness,
          business,
          selectedKeys,
          disabledKeys,
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

      <InputEmail handle={{ email, handleOnChange }} />

      <InputCellphone handle={{ cellphone, handleOnChange, codeSelected }} />
      <InputAddress handle={{ address, handleOnChange }} />
      <InputDetail handle={{ detail, handleOnChange }} />

      <InputChangeToken handle={{ token, handleOnChange, handleNewToken }} />
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
          className="uppercase w-full"
          type="submit"
        >
          Actualizar
        </Button>
      </div>
    </form>
  );
};
