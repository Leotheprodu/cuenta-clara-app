import { Input } from "@nextui-org/react";

export const PinCheckClientDashboard = ({ pinCheckHandle }: any) => {
  const { pin, inputRefs, handleChange, handleKeyDown, clientHavePin } =
    pinCheckHandle;
  return (
    <section>
      <div className="flex flex-col justify-end items-center gap-1 mb-5">
        <h1 className="text-slate-700">
          {clientHavePin
            ? "Ingrese su PIN para acceder"
            : "Ingresa Un Nuevo PIN"}
        </h1>
        <p className="text-slate-500 text-xs">
          {clientHavePin
            ? "Este PIN es el que creaste la primera vez que ingresaste, puedes solicitar resetear el pin contactando a tu proveedor"
            : "Recuerda este PIN para acceder a tu cuenta cada vez que lo necesites"}
        </p>
      </div>
      <div className="flex gap-2 items-end justify-center">
        {pin.map((value: string, index: number) => (
          <Input
            key={index}
            type="password"
            autoComplete="off"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={inputRefs[index]}
            maxLength={1}
            className="w-14 h-10"
            classNames={{
              inputWrapper: "border-2 border-gray-300 rounded-lg",
              input: "text-center font-bold text-2xl",
            }}
          />
        ))}
      </div>
    </section>
  );
};
