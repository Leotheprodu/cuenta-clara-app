"use client";
import { Toaster, toast } from "react-hot-toast";
import { useStore } from "@nanostores/react";
import { $toastGlobal } from "@/stores/toast";
import { useEffect } from "react";

export const GlobalToast = () => {
    const toastMessage = useStore($toastGlobal);
    const { type, message } = toastMessage;
    useEffect(() => {
        if (type === "error") {
            toast.dismiss();
            toast.error(message);
        } else if (type === "loading") {
            toast.dismiss();
            toast.loading(message);
        } else if (type === "success") {
            toast.dismiss();
            toast.success(message);
        } else if (type === "dismiss") {
            toast.dismiss();
        }
    }, [type, message]);

    return (
        <div>
            <Toaster />
        </div>
    );
};
