import { cellphoneFormat } from "@/components/Utils/cellphoneFormat";
import { whatsappMsgs } from "@/components/Utils/whatsappMsgs";
import { Tooltip } from "@nextui-org/react";
import { countryCodes } from "@/data/constants";

export const MainContactInfo = ({ client }: ClientCardProps) => {
  const { email, cellphone, country, address } = client;
  const code = countryCodes.find((item) => item.country === country);
  return (
    <section className="flex flex-col">
      {address?.length > 0 && (
        <div className="flex flex-col justify-center items-center mt-2 p-1">
          <p className="text-sm text-slate-500 text-center">{address}</p>
        </div>
      )}
      {(email || cellphone) && (
        <div className="flex flex-wrap justify-center items-center mt-2 p-1 text-slate-500">
          {cellphone && (
            <>
              <Tooltip
                color="primary"
                content="Enviar mensaje al cliente por whatsapp"
              >
                <a
                  className="text-sm hover:text-secundario ease-in duration-300"
                  target="_blank"
                  href={whatsappMsgs("justContact", client)}
                >
                  <p className="">
                    {"+" + code?.code + " " + cellphoneFormat(cellphone)}
                  </p>
                </a>
              </Tooltip>
              <span className="px-2 my-auto mx-0">-</span>
              <Tooltip
                color="primary"
                content="Enviar link del dashboard del cliente por WhatsApp"
              >
                <a
                  className="text-sm hover:text-secundario ease-in duration-300"
                  target="_blank"
                  href={whatsappMsgs("sendDashboardLink", client)}
                >
                  <p className="">Enviar Link</p>
                </a>
              </Tooltip>
            </>
          )}
          {email && (
            <>
              <Tooltip
                color="primary"
                placement="bottom"
                content="Enviar mensaje al cliente por correo electronico"
              >
                <a
                  target="_blank"
                  className="text-sm hover:text-secundario ease-in duration-300"
                  href={`mailto:${email}`}
                >
                  <p className="">{email}</p>
                </a>
              </Tooltip>
            </>
          )}
        </div>
      )}
    </section>
  );
};
