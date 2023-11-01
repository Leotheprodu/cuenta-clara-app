"use client";

import { UpdateClient } from "@/components/forms/UpdateClient/UpdateClient";

export const UpdateClientPage = ({ id }: { id: string }) => {
    return <UpdateClient id={id} />;
};
