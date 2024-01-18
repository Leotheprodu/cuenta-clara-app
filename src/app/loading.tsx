import React from "react";
import { Spinner } from "@nextui-org/spinner";

export default function Loading({ label = "Cargando" }: { label?: string }) {
  return (
    <div className=" flex items-center justify-center">
      <Spinner
        size="lg"
        color="primary"
        label={`${label}`}
        labelColor="primary"
        className="my-0 mx-auto"
      />
    </div>
  );
}
