import { fetchAPI } from "../../helpers/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { $toastGlobal } from "@/stores/toast";
import { useRouter } from "next/navigation";

export const useIsLoggedInHandle = () => {
    const router = useRouter();
    const user = useStore($user);
    const handleLogout = async () => {
        const { error } = await fetchAPI({
            url: "auth/logout",
        });
        if (!error) $user.set({ ...user, isLoggedIn: false });
        $toastGlobal.set({
            type: "success",
            message: `Nos vemos pronto ${user.user.username}`,
        });
    };

    return {
        handleLogout,
        router,
    };
};
