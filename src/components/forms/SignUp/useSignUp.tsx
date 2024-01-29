import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { useState, useEffect } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { countryCodes } from "@/data/constants";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";

export const useSignUp = (formInit: any) => {
  useNamingPagesRoutes({ internalLink: "sign-up" });

  const [form, setForm] = useState(formInit);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [noFormValue, setNoFormValue] = useState({
    username: false,
    email: false,
    cellphone: false,
    address: false,
  });
  const [codeSelected, setCodeSelected] = useState("506");
  const [countrySelected, setCountrySelected] = useState(
    new Set(["Costa Rica"])
  );
  const [isregistered, setIsRegistered] = useState(false);
  const { status, mutate, error, isPending } = useMutation({
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
    if (isInvalidPass) {
      setIsInvalidPass(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.password2, form.password]);
  useEffect(() => {
    if (noFormValue.address && form.address) {
      setNoFormValue({ ...noFormValue, address: false });
    }
    if (noFormValue.cellphone && form.cellphone) {
      setNoFormValue({ ...noFormValue, cellphone: false });
    }
    if (noFormValue.email && form.email) {
      setNoFormValue({ ...noFormValue, email: false });
    }
    if (noFormValue.username && form.username) {
      setNoFormValue({ ...noFormValue, username: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  useEffect(() => {
    const code = countryCodes.find(
      (item) => item.country === Array.from(countrySelected)[0]
    );
    setCodeSelected(code ? code.code : "");
  }, [countrySelected]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password2 !== form.password) {
      setIsInvalidPass(true);
      toast.error("Las contraseñas no coinciden");
      return;
    } else if (!form.username) {
      setNoFormValue({ ...noFormValue, username: true });
      toast.error("El nombre de usuario es requerido");
      return;
    } else if (!form.email) {
      setNoFormValue({ ...noFormValue, email: true });
      toast.error("El correo electrónico es requerido");
      return;
    } else if (!form.cellphone) {
      setNoFormValue({ ...noFormValue, cellphone: true });
      toast.error("El número de teléfono es requerido");
      return;
    } else if (!form.address) {
      setNoFormValue({ ...noFormValue, address: true });
      toast.error("La dirección es requerida");
      return;
    }
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
    noFormValue,
  };
};
