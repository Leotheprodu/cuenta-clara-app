import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const useAddButton = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handlePopoverOnClose = () => {
        setIsOpen(false);
    };
    const handlePopoverTriggerClick = () => {
        setIsOpen(!isOpen);
    };
    return {
        isOpen,
        handlePopoverOnClose,
        handlePopoverTriggerClick,
    };
};
