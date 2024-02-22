import { unitsOfProductsAndServices } from "@/data/constants";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

export const CatalogForm = ({
  handleCatalogForm,
  formId,
}: {
  handleCatalogForm: any;
  formId: string;
}) => {
  const {
    setInputError,
    inputError,
    typeValue,
    setTypeValue,
    unitValue,
    setUnitValue,
    productOrService,
    handleSubmit,
    onClose,
    handleOnChangeForm,
    handleOnClearForm,
    handleInventory_controlItem,
  } = handleCatalogForm;
  return (
    <form
      id={formId}
      onSubmit={(e) => handleSubmit(e, onClose)}
      className="flex flex-col gap-1 items-center justify-center"
    >
      <Select
        selectedKeys={typeValue}
        onSelectionChange={setTypeValue}
        label="Tipo"
        className="max-w-xs"
      >
        {[
          { value: "service", label: "Servicio" },
          { value: "product", label: "Producto" },
        ].map((servOrProduct) => (
          <SelectItem key={servOrProduct.value} value={servOrProduct.value}>
            {servOrProduct.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        className="max-w-xs"
        size="sm"
        type="text"
        label="Codigo"
        placeholder={`Ingresa el codigo para tu ${
          productOrService.type === "service" ? "servicio" : "producto"
        }`}
        value={productOrService.code}
        onChange={handleOnChangeForm}
        name="code"
        required
        isInvalid={inputError.code}
      ></Input>
      <Input
        className="max-w-xs"
        size="sm"
        type="text"
        label="Nombre"
        placeholder={`Ingresa el nombre para tu ${
          productOrService.type === "service" ? "servicio" : "producto"
        }`}
        onClear={() => handleOnClearForm("name")}
        value={productOrService.name}
        onChange={handleOnChangeForm}
        name="name"
        isClearable
        required
      ></Input>
      <Input
        className="max-w-xs"
        size="sm"
        type="text"
        label="Descripcion"
        placeholder={`Ingresa la descripcion de tu ${
          productOrService.type === "service" ? "servicio" : "producto"
        }`}
        onClear={() => handleOnClearForm("description")}
        value={productOrService.description}
        onChange={handleOnChangeForm}
        name="description"
        isClearable
        required
      ></Input>
      <Select
        selectedKeys={unitValue}
        onSelectionChange={setUnitValue}
        label="Tipo"
        className="max-w-xs"
      >
        {unitsOfProductsAndServices.map((units) => (
          <SelectItem key={units} value={units}>
            {units}
          </SelectItem>
        ))}
      </Select>
      <Input
        className="max-w-xs"
        size="sm"
        type="number"
        label="Precio"
        placeholder={`Ingresa el precio de tu ${
          productOrService.type === "service" ? "servicio" : "producto"
        }`}
        value={productOrService.unit_price.toString()}
        onClear={() => handleOnClearForm("unit_price")}
        isClearable
        isInvalid={productOrService.unit_price <= 0}
        onChange={handleOnChangeForm}
        name="unit_price"
        required
      ></Input>
      <div className="flex gap-2">
        <Checkbox
          isSelected={productOrService.inventory_control}
          onValueChange={handleInventory_controlItem}
        >
          Control de Inventario
        </Checkbox>
      </div>
    </form>
  );
};
