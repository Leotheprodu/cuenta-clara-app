import { createRef, useEffect, useState } from "react";

export const usePinCheckHandle = ({
  clientHavePin,
  okPin,
}: {
  clientHavePin: boolean;
  okPin: boolean;
}) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = [createRef(), createRef(), createRef(), createRef()];

  const handleChange = (index: number, e: any) => {
    const newPin = [...pin];
    newPin[index] = e.target.value.slice(-1);
    setPin(newPin);

    // Enfocar el siguiente input si el valor actual no está vacío
    if (e.target.value !== "" && index < inputRefs.length - 1) {
      (inputRefs[index + 1].current as HTMLInputElement).focus();
    }
  };
  useEffect(() => {
    if (clientHavePin) {
      setPin(["", "", "", ""]);
      (inputRefs[0].current as HTMLInputElement).focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientHavePin]);
  useEffect(() => {
    if (
      !okPin &&
      pin[0] !== "" &&
      pin[1] !== "" &&
      pin[2] !== "" &&
      pin[3] !== ""
    ) {
      /* setPin(["", "", "", ""]); */
      (inputRefs[0].current as HTMLInputElement).focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [okPin, pin]);

  useEffect(() => {
    (inputRefs[0].current as HTMLInputElement).focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleKeyDown = (index: number, e: any) => {
    // Enfocar el input anterior si se presiona la tecla de retroceso y el valor está vacío
    if (e.key === "Backspace" && index > 0 && pin[index] === "") {
      (inputRefs[index - 1].current as HTMLInputElement).focus();
    }
  };

  return {
    pinCheckHandle: {
      pin,
      inputRefs,
      handleChange,
      handleKeyDown,
    },
  };
};
