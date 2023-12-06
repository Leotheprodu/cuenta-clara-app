export const HeaderCreateInvoice = ({ handle }: HeaderCreateInvoiceProps) => {
  const { username, businessSelected } = handle;
  return (
    <div className="bg-secundario z-10 w-full h-[3rem] flex gap-2 justify-center items-center fixed left-0">
      <p className="bg-primario p-1 rounded-md text-center text-blanco">
        Cliente: <span className="uppercase text-terciario">{username}</span>
      </p>
      <p className="bg-primario p-1 rounded-md text-center text-blanco">
        Negocio:{" "}
        <span className="uppercase text-terciario">
          {businessSelected.name}
        </span>
      </p>
    </div>
  );
};
