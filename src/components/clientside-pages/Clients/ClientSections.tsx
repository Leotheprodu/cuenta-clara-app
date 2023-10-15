import Link from "next/link";

export const ClientSections = ({ client }: ClientCardProps) => {
    const { id } = client;
    return (
        <div className="flex flex-wrap gap-2 text-xs">
            <Link href={`/clientes/${id}`}>Saldos</Link>
            <Link href={`/clientes/actualizar/${id}`}>Actualizar</Link>
            <Link href={`/clientes/eliminar/${id}`}>Eliminar</Link>
            <Link href={`/nueva-transaccion?id=${id}`}>Transacción</Link>
        </div>
    );
};
