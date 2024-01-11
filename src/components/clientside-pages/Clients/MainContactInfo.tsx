import { cellphoneFormat } from "@/components/Utils/cellphoneFormat";
import { whatsappMsgs } from "@/components/Utils/whatsappMsgs";
import { Tooltip } from "@nextui-org/react";
import { countryCodes } from "@/data/constants";

export const MainContactInfo = ({ client }: ClientCardProps) => {
  const { email, cellphone, country } = client;
  const code = countryCodes.find((item) => item.country === country);
  return (
    <div className="flex flex-wrap justify-center items-center mt-2 h-[3.5rem] border-x-1 border-terciario">
      {cellphone && (
        <>
          <Tooltip content="Enviar mensaje al cliente por whatsapp">
            <a
              className="text-sm hover:text-secundario ease-in duration-300"
              target="_blank"
              href={whatsappMsgs("justContact", client)}
            >
              <p className="hover:scale-110 duration-200">
                {"+" + code?.code + " " + cellphoneFormat(cellphone)}
              </p>
            </a>
          </Tooltip>
          <span className="px-2 my-auto mx-0">-</span>
          <Tooltip content="Enviar link del dashboard del cliente por WhatsApp">
            <a
              className="text-sm hover:text-secundario ease-in duration-300"
              target="_blank"
              href={whatsappMsgs("sendDashboardLink", client)}
            >
              <p className="hover:scale-110 duration-200">Enviar Link</p>
            </a>
          </Tooltip>
        </>
      )}
      {email && (
        <>
          <span className="px-2 my-auto mx-0">-</span>
          <Tooltip
            placement="bottom"
            content="Enviar mensaje al cliente por correo electronico"
          >
            <a
              target="_blank"
              className="text-sm hover:text-secundario ease-in duration-300"
              href={`mailto:${email}`}
            >
              <p className="hover:scale-110 duration-200">{email}</p>
            </a>
          </Tooltip>
        </>
      )}
    </div>
  );
};
