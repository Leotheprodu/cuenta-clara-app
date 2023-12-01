import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { useState, useEffect } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { internalLinks } from "@/components/Utils/internalLinks";
import { countryCodes } from "@/data/constants";

export const useSignUp = (formInit: any) => {
  const [form, setForm] = useState(formInit);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [codeSelected, setCodeSelected] = useState("506");
  const [countrySelected, setCountrySelected] = useState(
    new Set(["Costa Rica"])
  );
  const [isregistered, setIsRegistered] = useState(false);
  const { status, data, mutate, error, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async () =>
      await fetchAPI({
        url: "auth/signup",
        method: "POST",
        body: {
          ...form,
          cellphone: form.cellphone ? form.cellphone.replace(/\D/g, "") : null,
          country: Array.from(countrySelected)[0],
        },
      }),
  });

  useEffect(() => {
    if (status === "success") {
      toast.success(
        "Usuario creado correctamente, por favor verifique su correo electrónico",
        { duration: 5000 }
      );
      setIsRegistered(true);
    } else if (status === "error") {
      toast.error(error?.message || "");
    }
    /* return () => toast.dismiss(); */
  }, [error, status, form]);
  useEffect(() => {
    if (form.password2 !== form.password) {
      setIsInvalidPass(true);
      toast.error("Las contraseñas no coinciden");
    } else {
      setIsInvalidPass(false);
    }
    return () => toast.dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.password2]);
  useEffect(() => {
    const code = countryCodes.find(
      (item) => item.country === Array.from(countrySelected)[0]
    );
    setCodeSelected(code ? code.code : "");
  }, [countrySelected]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  const handleCountrySelectionChange = (keys: any) => {
    setCountrySelected(keys);
  };
  return {
    ...form,
    toggleVisibility,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
    handleOnClear: (name: string) => handleOnClear(name, setForm),
    handleSignUp,
    isVisible,
    isPending,
    isInvalidPass,
    handleCountrySelectionChange,
    codeSelected,
    countrySelected,
    countryCodes,
    isregistered,
  };
};
