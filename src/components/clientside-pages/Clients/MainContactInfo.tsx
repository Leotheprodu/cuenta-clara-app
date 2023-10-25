export const MainContactInfo = ({ client }: ClientCardProps) => {
    const { username, email, cellphone, token, id } = client;
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    return (
        <div className="flex flex-col gap-1 mt-2 w-full h-[3.5rem]">
            {email && (
                <a href={`mailto:${email}`}>
                    <p className="text-xs hover:font-semibold hover:text-secundario transition-all ease-linear duration-100">
                        {email}
                    </p>
                </a>
            )}
            {cellphone && (
                <>
                    <a
                        target="_blank"
                        href={`https://wa.me/506${cellphone}?text=Hola!%20${username},%20`}
                    >
                        <p
                            title={`Enviar mensaje de texto a ${username} por medio de whatsapp`}
                            className="text-xs hover:font-semibold hover:text-secundario transition-all ease-linear duration-100"
                        >{`+506${cellphone}`}</p>
                    </a>
                    <a
                        target="_blank"
                        href={`https://wa.me/506${cellphone}?text=%2ALink%20de%20Dashboard%2A%0A%0A${username}%2C%20tu%20Link%20es%3A%20%0A%0A${
                            domain + "dashboard/?token=" + token + "%26id=" + id
                        }%0A%0A_Recuerda%20no%20compartir%20este%20link%2C%20para%20proteger%20tu%20informaci%C3%B3n_`}
                    >
                        <p
                            title={`Enviar link de conexion a ${username} por medio de WhatsApp`}
                            className="text-xs hover:font-semibold hover:text-secundario transition-all ease-linear duration-100"
                        >
                            {" "}
                            Enviar Link
                        </p>
                    </a>
                </>
            )}
        </div>
    );
};
