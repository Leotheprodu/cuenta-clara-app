import { ClientCardProps } from "./InterfacesClientsPage";

export const MainContactInfo = ({ client }: ClientCardProps) => {
    const { username, email, cellphone, token, id } = client;
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    return (
        <div>
            <a href={`mailto:${email}`}>
                <p className="text-xs text-secundario">{email}</p>
            </a>
            <a
                target="_blank"
                href={`https://wa.me/506${cellphone}?text=Hola!%20${username},%20`}
            >
                <p className="text-xs text-secundario">{`+506 ${cellphone}`}</p>
            </a>
            <a
                target="_blank"
                href={`https://wa.me/506${cellphone}?text=%2ALink%20de%20Dashboard%2A%0A%0A${username}%2C%20tu%20Link%20es%3A%20%0A%0A${
                    domain + "/" + "dashboard/?token=" + token + "%26id=" + id
                }%0A%0A_Recuerda%20no%20compartir%20este%20link%2C%20para%20proteger%20tu%20informaci%C3%B3n_`}
            >
                <p className="text-xs text-secundario">Enviar Link</p>
            </a>
        </div>
    );
};
