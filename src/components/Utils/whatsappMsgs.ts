import { businessConfigInfo, countryCodes, domain } from "@/data/constants";
import { $balanceRechargeInfo } from "@/stores/business";

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
  const code = countryCodes.find(
    (code) => code.country === client?.country
  )?.code;
  const balanceRechargeInfo = $balanceRechargeInfo.value;
  const { username, cellphone, token, id } = client ? client : noClient;

  if (name === "justContact") {
    return `https://wa.me/${code + cellphone}?text=Hola!%20${username},%20`;
  } else if (name === "sendDashboardLink") {
    return `https://wa.me/${
      code + cellphone
    }?text=%2ALink%20de%20Dashboard%2A%0A%0A${username}%2C%20tu%20Link%20es%3A%20%0A%0A${
      domain + "clientes/dashboard/" + token
    }%0A%0A_Recuerda%20no%20compartir%20este%20link%2C%20para%20proteger%20tu%20informaci%C3%B3n_`;
  } else if (name === "sendRechargeBalanceComprobant") {
    return `https://wa.me/${
      code + businessConfigInfo.whatsapp
    }?text=Nueva%20recarga%20de%20Saldo%20id%3A%0A%0A${
      balanceRechargeInfo?.balanceRechargeId
    }%2C%20recarga%20realizada%20por%3A%20%0A%0A${username}%2C%20monto%3A%20%0A%0A${
      balanceRechargeInfo?.balanceType.price
    }%20Por%20medio%20de%3A%0A%0A${
      balanceRechargeInfo?.payment_method.payment_method.name
    }%20usando%3A%0A%0A${
      balanceRechargeInfo?.payment_method.payment_method_description
    }.`;
  }
};
