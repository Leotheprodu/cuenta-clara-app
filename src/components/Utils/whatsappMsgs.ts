import { businessConfigInfo, countryCodes, domain } from "@/data/constants";
import { $balanceRechargeInfo } from "@/stores/business";
//TODO esta función se puede mejorar, ya que como no esta tipado tiene muchas posibilidades de fallar, si se cambia algo en la data.
export const whatsappMsgs = (
  name: whatsappMsgsNames["name"],
  client?: any,
  data?: any
) => {
  const noClient = {
    username: "",
    email: "",
    cellphone: "",
    token: "",
    id: 0,
  };
  const codeGenerator = (country: string) => {
    const code = countryCodes.find((code) => code.country === country)?.code;
    return code;
  };
  const balanceRechargeInfo = $balanceRechargeInfo.value;

  if (name === "justContact") {
    const { username, cellphone, country } = client ? client : noClient;
    return `https://wa.me/${
      codeGenerator(country) + cellphone
    }?text=Hola!%20${username},%20`;
  } else if (name === "sendDashboardLink") {
    const { username, cellphone, token, country } = client ? client : noClient;
    return `https://wa.me/${
      codeGenerator(country) + cellphone
    }?text=%2ALink%20de%20Dashboard%2A%0A%0A${username}%2C%20tu%20Link%20es%3A%20%0A%0A${
      domain + "clientes/dashboard/" + token
    }%0A%0A_Recuerda%20no%20compartir%20este%20link%2C%20para%20proteger%20tu%20informaci%C3%B3n_`;
  } else if (name === "sendRechargeBalanceComprobant") {
    const { username, country } = client ? client : noClient;
    return `https://wa.me/${
      codeGenerator(country) + businessConfigInfo.whatsapp
    }?text=Nueva%20recarga%20de%20Saldo%20id%3A%0A%0A${
      balanceRechargeInfo?.balanceRechargeId
    }%2C%20recarga%20realizada%20por%3A%20%0A%0A${username}%2C%20monto%3A%20%0A%0A${
      balanceRechargeInfo?.balanceType.price
    }%20Por%20medio%20de%3A%0A%0A${
      balanceRechargeInfo?.payment_method.payment_method.name
    }%20usando%3A%0A%0A${
      balanceRechargeInfo?.payment_method.payment_method_description
    }.`;
  } else if (name === "ContactClientInvoice") {
    const { id, total_amount, users_business } = data;
    const { balances, client: clientData } = client;
    return `https://wa.me/${
      codeGenerator(balances[0]?.users_business.user.country) +
      balances[0]?.users_business.user.cellphone
    }?text=Contacta%20%2A${clientData?.username.toUpperCase()}%2C%2A%20cliente%20id%3A%20%2A${
      clientData?.id
    }%2A%0AAcerca%20de%20la%20factura%20id%3A%20%2A${id}%2C%2A%20monto%20de%20factura%3A%20%2A${total_amount}%2C%2A%20en%20su%20negocio%3A%20%2A${
      users_business?.name
    }%2A%20%0AContacta%20por%20la%20siguiente%20razon%3A%0A%0A`;
  }
};
