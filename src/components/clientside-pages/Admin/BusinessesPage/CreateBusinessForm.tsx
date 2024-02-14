import { Button, Input } from "@nextui-org/react";

export const CreateBusinessForm = ({
  CreateBusinessData,
}: CreateBusinessDataProps) => {
  const {
    name,
    handleOnChange,
    handleOnClear,
    handleCreateBusiness,
    isPendingCreateBusiness,
  } = CreateBusinessData;
  return (
    <section className="mt-4">
      <form
        onSubmit={handleCreateBusiness}
        className="flex gap-1 items-center justify-center"
      >
        <Input
          size="sm"
          type="text"
          label="Nuevo Negocio"
          placeholder="Ingresa un nombre"
          onClear={() => handleOnClear("name")}
          value={name}
          onChange={handleOnChange}
          name="name"
          isClearable
          required
          disabled={isPendingCreateBusiness}
        ></Input>
        <Button type="submit">Crear</Button>
      </form>
      <div className="flex max-w-[30rem] mt-1">
        <p className="text-slate-400 text-xs p-4">
          Puedes crear un nuevo negocio con el nombre que desees, pero, como no
          los puedes eliminar, es preferible que reutilices alguno que ya no
          uses, le puedes cambiar el nombre.
        </p>
      </div>
    </section>
  );
};
