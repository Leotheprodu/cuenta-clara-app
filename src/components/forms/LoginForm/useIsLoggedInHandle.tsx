import { fetchAPI } from "../../Utils/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
export const useIsLoggedInHandle = () => {
    const router = useRouter();
    const user = useStore($user);

    const { status, mutate, error, isPending } = useMutation({
        mutationKey: ["checkIsLogedIn"],
        mutationFn: async () =>
            await await fetchAPI({
                url: "auth/logout",
            }),
        retry: 2,
    });

    useEffect(() => {
        if (status === "success") {
            $user.set({ ...user, isLoggedIn: false });
            toast.success(`Nos vemos pronto ${user.user.username}`);
        } else if (status === "error") toast.error(error?.message || "");
    }, [user, status, error]);

    const handleLogout = () => {
        mutate();
    };

    return {
        handleLogout,
        router,
        isPending,
    };
};
