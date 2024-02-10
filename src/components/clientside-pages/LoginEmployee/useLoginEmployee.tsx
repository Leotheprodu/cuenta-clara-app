import { useState, useEffect } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { redirect } from "next/navigation";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { internalLinks } from "@/components/Utils/internalLinks";
export const useLoginEmployee = (formInit: {
  username: string;
  password: string;
}) => {
  const user = useStore($user);
  const [form, setForm] = useState(formInit);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const { status, data, mutate, error, isPending } = useMutation({
    mutationKey: ["login-employee"],
    mutationFn: async () =>
      await fetchAPI({
        url: "auth/login-employee",
        method: "POST",
        body: { ...form, isEmployee: true },
      }),
  });

  useEffect(() => {
    if (status === "success") {
      $user.set(data);
      toast.success(
        `Bienvenido ${
          data.employee.isEmployee
            ? data.employee.employeeName
            : data.user.username
        }`
      );
      redirect(internalLinks("clients"));
    } else if (status === "error") {
      toast.error(error?.message || "");
      error?.message === "Contraseña Incorrecta" && setIsInvalidPass(true);
    }
    /* return () => toast.dismiss(); */
  }, [data, error, status]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return {
    ...form,
    user,
    isVisible,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
    handleOnClear: (name: string) => handleOnClear(name, setForm),
    toggleVisibility: () => setIsVisible(!isVisible),
    isInvalidPass,
    handleLogin,
    isPending,
  };
};
