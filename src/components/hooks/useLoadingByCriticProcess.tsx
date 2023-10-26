import { useStore } from "@nanostores/react";
import { $isCheckingSession } from "@/stores/generalConfig";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

export const useLoadingByCriticProcess = ({ label }: { label: string }) => {
    const isCheckingSession = useStore($isCheckingSession);
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        if (isCheckingSession) {
            setShowLoading(isCheckingSession);
        } else {
            setShowLoading(false);
        }
    }, [isCheckingSession]);

    return {
        showLoading,
        LoadingElement: <Loading label={label} />,
    };
};
