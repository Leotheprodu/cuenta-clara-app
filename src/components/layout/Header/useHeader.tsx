import { useEffect, useState, useMemo } from "react";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";

export const useHeader = () => {
    const user = useStore($user);
    const [business, setBusiness] = useState([
        { id: 0, name: "", default: false, user_id: 0 },
    ]);
    const [value, setValue] = useState(new Set([""]));
    const {
        status: statusBusiness,
        data: dataBusiness,
        isLoading: isLoadingBusiness,
        refetch,
    } = useQuery({
        queryKey: ["users-business"],
        queryFn: async () =>
            await fetchAPI({
                url: "users_business",
            }),
        retry: 2,
    });

    useEffect(() => {
        if (statusBusiness === "success" && user.isLoggedIn) {
            setBusiness(dataBusiness);
            dataBusiness.filter((item: any) => {
                if (item.default) {
                    setValue(new Set([item.id.toString()]));
                }
                return item;
            });
        }
    }, [statusBusiness, dataBusiness, user]);

    const { status, mutate, error, isPending } = useMutation({
        mutationKey: ["favorite-business"],
        mutationFn: async () =>
            await fetchAPI({
                url: `users_business/favorite/${Array.from(value)[0]}`,
            }),
        retry: 2,
    });
    useEffect(() => {
        if (status === "success" && user.isLoggedIn) {
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, user]);

    const handleSelectionBusiness = (e: any) => {
        setValue(e);
    };
    const mutateFunction = () => {
        mutate();
    };
    return {
        business,
        isLoadingBusiness,
        value,
        handleSelectionBusiness,
        isPending,
        mutateFunction,
    };
};
