import { domain } from "@/data/constants";

export const whatsappMsgs = (
    name: whatsappMsgsNames["name"],
    client?: ClientProps
) => {
    const noClient = {
        username: "",
        email: "",
        cellphone: "",
        token: "",
        id: 0,
    };
    const { username, cellphone, token, id } = client ? client : noClient;

    if (name === "justContact") {
        return `https://wa.me/${cellphone}?text=Hola!%20${username},%20`;
    } else if (name === "sendDashboardLink") {
        return `https://wa.me/${cellphone}?text=%2ALink%20de%20Dashboard%2A%0A%0A${username}%2C%20tu%20Link%20es%3A%20%0A%0A${
            domain + "dashboard/?token=" + token + "%26id=" + id
        }%0A%0A_Recuerda%20no%20compartir%20este%20link%2C%20para%20proteger%20tu%20informaci%C3%B3n_`;
    }
};
