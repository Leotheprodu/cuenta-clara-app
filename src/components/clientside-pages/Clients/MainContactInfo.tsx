export const MainContactInfo = ({ client }: ClientCardProps) => {
    const { username, email, cellphone, token, id } = client;
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    return (
        <div className="flex flex-wrap justify-center items-center mt-2 h-[3.5rem] border-x-1 border-terciario">
            {cellphone && (
                <>
                    <a
                        title={`Enviar mensaje de texto por Whatsapp`}
                        className="text-xs hover:text-secundario ease-in duration-300"
                        target="_blank"
                        href={`https://wa.me/${cellphone}?text=Hola!%20${username},%20`}
                    >{`+${
                        cellphone.toString().slice(0, -8) +
                        " " +
                        cellphone.toString().slice(-8, -4) +
                        " " +
                        cellphone.toString().slice(-4)
                    }`}</a>
                    <span className="px-2 my-auto mx-0">-</span>
                    <a
                        title={`Enviar link de conexion por WhatsApp`}
                        className="text-xs hover:text-secundario ease-in duration-300"
                        target="_blank"
                        href={`https://wa.me/${cellphone}?text=%2ALink%20de%20Dashboard%2A%0A%0A${username}%2C%20tu%20Link%20es%3A%20%0A%0A${
                            domain + "dashboard/?token=" + token + "%26id=" + id
                        }%0A%0A_Recuerda%20no%20compartir%20este%20link%2C%20para%20proteger%20tu%20informaci%C3%B3n_`}
                    >
                        Enviar Link
                    </a>
                    {email && (
                        <>
                            <span className="px-2 my-auto mx-0">-</span>
                            <a
                                title={`Enviar mensaje al correo electronico`}
                                target="_blank"
                                className="text-xs hover:text-secundario ease-in duration-300"
                                href={`mailto:${email}`}
                            >
                                <p>{email}</p>
                            </a>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
