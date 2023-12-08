import { moneyFormat } from "@/components/Utils/dataFormat";
import { productAndServiceCodeClean } from "@/components/Utils/productAndServiceCodeClean";
import { SearchIcon } from "@/icons/SearchIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
export const ModalSearchProductsAndServices = ({
  handle,
}: CreateInvoiceDetailProps) => {
  const { createInvoiceDetail } = handle;
  const {
    isOpenModalPS,
    onOpenChangeModalPS,
    handleCloseModalPS,
    handleAddPStoDetail,
    filteredProductsAndServices,
    searchPS,
    handleSearchPS,
  } = createInvoiceDetail;
  return (
    <Modal
      backdrop="blur"
      placement="center"
      size="2xl"
      isOpen={isOpenModalPS}
      onOpenChange={onOpenChangeModalPS}
      classNames={{
        body: "py-6 ",
        backdrop: "bg-[#292f46]/90 backdrop-opacity-30",
        base: "",
        header: "",
        footer: "",
        closeButton: "",
      }}
    >
      <ModalContent className="w-full">
        {(onClose) => (
          <>
            <ModalHeader className="">Agregar Producto o Servicio</ModalHeader>
            <ModalBody className="">
              <Input
                onChange={handleSearchPS}
                value={searchPS}
                type="text"
                size="lg"
                placeholder="Buscar producto o servicio"
                className="sm:w-1/2 shadow-sm mb-2"
                startContent={
                  <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              ></Input>
              <div className="overflow-x-auto">
                <div className="rounded-xl w-full shadow-lg">
                  <table className="table-auto w-full">
                    <thead className="bg-gris/80 text-center">
                      <tr>
                        <th className="py-1 px-2">Código</th>
                        <th className="py-1 px-2">Nombre</th>
                        <th className="py-1 px-2">Unidad</th>
                        <th className="py-1 px-2">Precio</th>
                        <th className="py-1 px-2">Favorito</th>
                        <th className="py-1 px-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProductsAndServices.map(
                        (ps: DataProductsAndServicesProps) => (
                          <tr
                            onClick={() => handleAddPStoDetail(onClose, ps)}
                            className="cursor-pointer hover:bg-primario hover:text-blanco rounded-2xl"
                            key={ps.id}
                          >
                            <td className="py-1 px-2 text-center">
                              {productAndServiceCodeClean(ps.code)}
                            </td>
                            <td className="py-1 px-2">{ps.name}</td>
                            <td className="py-1 px-2">{ps.unit}</td>
                            <td className="py-1 px-2">
                              {moneyFormat(ps.unit_price)}
                            </td>
                            <td className="py-1 px-2 text-center">
                              {ps.default ? "Si" : "No"}
                            </td>
                            <td className="py-1 px-2">{ps.description}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="ghost"
                onPress={() => handleCloseModalPS(onClose)}
                tabIndex={1}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
