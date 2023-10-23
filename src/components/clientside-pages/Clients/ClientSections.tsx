import Link from "next/link";

export const ClientSections = ({ client }: ClientCardProps) => {
    const { id } = client;
    return (
        <div className="flex flex-wrap gap-2 text-xs">
            <Link
                className="hover:font-semibold hover:text-secundario transition-all ease-linear duration-100"
                href={`/clientes/${id}`}
            >
                Saldos
            </Link>
            <Link
                className="hover:font-semibold hover:text-secundario transition-all ease-linear duration-100"
                href={`/clientes/actualizar/${id}`}
            >
                Actualizar
            </Link>
            <Link
                className="hover:font-semibold hover:text-secundario transition-all ease-linear duration-100"
                href={`/clientes/eliminar/${id}`}
            >
                Eliminar
            </Link>
            <Link
                className="hover:font-semibold hover:text-secundario transition-all ease-linear duration-100"
                href={`/nueva-transaccion?id=${id}`}
            >
                Transacción
            </Link>
        </div>
    );
};
