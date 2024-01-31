import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { SearchIcon } from "@/icons/SearchIcon";
import Link from "next/link";
import { internalLinks } from "@/components/Utils/internalLinks";
import { useClientsPage } from "@/components/clientside-pages/Clients/useClientsPage";
import { $AppState, $internalLinkName } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { ChangeIcon } from "@/icons/ChangeIcon";

export const ModalChangeClient = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleSearchClient, searchClient, clientsSearched } =
    useClientsPage();
  const appState = useStore($AppState);
  const internalLinkName = useStore($internalLinkName);
  return (
    <>
      <Button onPress={onOpen} variant="light" color="primary">
        <ChangeIcon className="text-terciario" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-20">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cambiar de cliente
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center w-full">
                  <Input
                    onChange={handleSearchClient}
                    value={searchClient}
                    type="text"
                    size="sm"
                    placeholder="Buscar cliente"
                    className=""
                    startContent={
                      <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                  ></Input>
                  <div className="flex flex-wrap item-center justify-center gap-2 mt-4">
                    {clientsSearched.length > 0 &&
                      clientsSearched.map((client: ClientProps) => (
                        <Link
                          href={`${internalLinks(internalLinkName)}${
                            client.id
                          }`}
                          key={client.id}
                          className="flex flex-col gap-2 p-1 bg-slate-100 rounded-md shadow-small hover:shadow-medium duration-100 ease-in cursor-pointer"
                        >
                          <p className="text-primario text-center">
                            {client.username}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
